import { Camera } from 'expo-camera';
import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import tailwind from 'tailwind-rn';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';

import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';
import Canvas from 'react-native-canvas';
import { CanvasRenderingContext2D } from 'react-native-canvas';

const TensorCamera = cameraWithTensors(Camera);
const { width, height } = Dimensions.get('window');

const textureDims =
  Platform.OS == 'ios' ? { width: 1080, height: 1920 } : { width, height };

interface IProps {
  onBack: () => void;
  onDone: () => void;
  setCamera: (c: boolean) => void;
  status: { scanning: boolean };
  /**
   * Run on every frame. Returns the items detected in that frame.
   */
  onItemsDetected: (names: string[]) => void;
  modelName: string;
}

const status = { scanning: false, detecting: false };

const VisionCamera: FC<IProps> = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageStream, setImageStream] =
    useState<IterableIterator<tf.Tensor3D>>();
  const [tfReady, setTfReady] = useState(false);
  const [recognizedIngs, setRecognizedIngs] = useState<string[]>([]);
  const [modelName, setModelName] = useState(props.modelName || 'generalModel');
  const context = useRef<CanvasRenderingContext2D>();
  const canvas = useRef<Canvas>();

  // using mutable data to stop the infinite loop in useEffect
  status.scanning = props.status.scanning;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // initialize tensorflow
      tf.setBackend('cpu');
      await tf.ready();
      setTfReady(true);
    })();
  }, [hasPermission]);

  useEffect(() => {
    if (
      tfReady &&
      imageStream &&
      hasPermission &&
      props.status.scanning &&
      !status.detecting
    ) {
      // recursively call detect
      console.log('\n\n starting a new loop\n\n');
      (async function loop() {
        status.detecting = true;
        const names = await detect();
        recognizedIngs.push(...names);
        if (status.scanning) loop();
        else {
          props.onItemsDetected(recognizedIngs);
          status.detecting = false;
          context.current.clearRect(0, 0, width, height);
        }
      })();
    }
  }, [hasPermission, imageStream, tfReady, props.status]);

  const detect = async () => {
    if (!imageStream) return;
    const nextImageTenor = imageStream.next().value;
    if (!nextImageTenor) return;

    const shape = nextImageTenor.shape;
    const array = await nextImageTenor.array();

    // const t0 = performance.now();
    const detections = (await getDetections(array, shape).catch((err) => {
      console.error('AXIOS ERROR: ', JSON.stringify(err, null, 2));
    })) as {
      boxes: number[][];
      inferenceTime: number;
      names: string[];
    };
    // const t1 = performance.now();

    // console.log('detection took: ', t1 - t0, '(', 1000 / (t1 - t0), ' fps)');

    // Draw mesh
    const ctx = context.current;

    // 5. TODO - Update drawing utility
    requestAnimationFrame(() => {
      if (ctx) drawRect(detections.boxes, detections.names, width, height, ctx);
    });

    tf.dispose(nextImageTenor);

    return detections.names;
  };

  const getDetections = async (tensor: number[][][], shape: number[]) => {
    // console.log('sending the blob: ', JSON.stringify(array));
    return new Promise((resolve, reject) => {
      // Post via axios or other transport method
      axios
        .post('http://88.251.29.169:80/predict/tensor', {
          payload: { shape: shape, tensor: tensor, modelName },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const handleCameraReady = async (
    imageStream: IterableIterator<tf.Tensor3D>
  ) => {
    // setting images stream
    setImageStream(imageStream);
    props.setCamera(true);
  };

  const handleCanvasReady = async (cvs: Canvas) => {
    if (cvs) {
      cvs.width = width;
      cvs.height = height;
      context.current = cvs.getContext('2d');
      canvas.current = cvs;
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/** have tensorcamera here */}
      <TensorCamera
        style={{ width: '100%', height: '100%' }}
        type={type}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={300}
        resizeWidth={300}
        resizeDepth={3}
        onReady={handleCameraReady}
        autorender={true}
        useCustomShadersToResize={false}
      />
      <Canvas
        style={{
          position: 'absolute',
          zIndex: 100000,
          width: '100%',
          height: '100%',
        }}
        ref={handleCanvasReady}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('flex-1 w-full'),
    position: 'relative',
  },
  camera: {
    ...tailwind('flex-1 w-full relative'),
  },
  buttonContainer: {
    ...tailwind(
      'absolute w-full flex flex-row justify-between items-center top-8 px-4'
    ),
    backgroundColor: 'transparent',
  },
  btn: {
    ...tailwind('p-2 rounded-full'),
    backgroundColor: '#333333',
  },
  scanBtnContainer: {
    ...tailwind('absolute w-full flex justify-center items-center bottom-10'),
  },
  scanBtn: {
    ...tailwind('flex justify-center items-center rounded-full'),
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    height: 60,
    width: 60,
  },
  badge: {
    ...tailwind('rounded-full'),
    marginBottom: -15,
    marginRight: -10,
    zIndex: 1,
    alignSelf: 'flex-end',
    // backgroundColor: '#333333',
  },
});

// The drawing function
export const drawRect = (
  boxes: number[][],
  names: string[],
  imgWidth: number,
  imgHeight: number,
  ctx: CanvasRenderingContext2D
) => {
  // clear the rect
  ctx.clearRect(0, 0, imgWidth, imgHeight);

  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];

    // flip the coordinate system vertically
    let x1 = box[1];
    let x2 = box[3];

    x1 = x1 - 0.5; // shift the coordinate system to 0
    x2 = x2 - 0.5;

    x1 = -x1; // flip the coordinate system horizontally
    x2 = -x2;

    // shift the coordinate system back to the original
    x1 = x1 + 0.5;
    x2 = x2 + 0.5;

    box[1] = x2;
    box[3] = x1;

    ctx.fillStyle = 'rgba(255,255,255,0.2';
    ctx.strokeStyle = '#F8774A';
    ctx.fillRect(
      box[1] * imgWidth,
      box[0] * imgHeight,
      imgWidth * (box[3] - box[1]),
      imgHeight * (box[2] - box[0])
    );
    ctx.font = '15px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(
      names[i],
      box[1] * imgWidth,
      box[0] * imgHeight - 4,
      box[0] * imgHeight
    );
    ctx.lineWidth = 2;
    ctx.strokeRect(
      box[1] * imgWidth,
      box[0] * imgHeight,
      imgWidth * (box[3] - box[1]),
      imgHeight * (box[2] - box[0])
    );
  }
};

export default VisionCamera;
