import { AntDesign, Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Slide, Spinner, VStack } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import RecipesApi from '../../api/recipesApi';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import Ingredient from '../../models/ingredient';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setScannedIngredients } from '../../store/slices/IngredientsListSlice';
import {
  selectHideTabBar,
  setHideTabBar,
} from '../../store/slices/sharedSlice';
import VisionCamera from './CameraView';
import ScannedListScreen from './components/ScannedListScreen';

type ModelName =
  | 'generalModel'
  | 'veggiesModel'
  | 'fruitsModel'
  | 'animalsModel';

const ScanningScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isTabBarHidden = useAppSelector(selectHideTabBar);
  const isFocused = useIsFocused();
  const [showScannedList, setShowScannedList] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState([] as Ingredient[]);
  const [modelName, setModelName] = useState<ModelName>('generalModel');

  // Instance of camera built in the CameraView component
  // Initialized when the camera is mounted.
  const [cameraActive, setCameraActive] = useState<boolean>(null);

  const [isRecognizing, setIsRecognizing] = useState(false);

  const scanBtnAnimation = useRef(new Animated.Value(0)).current;
  // Hide the tab bar when this tab is focused (camera is open).
  useEffect(() => {
    if (!isTabBarHidden) dispatch(setHideTabBar(isFocused));
  }, [isFocused]);

  // Changes the scan button animation when button is long pressed
  // Scale is change to 1.5 and back to 1.
  useEffect(() => {
    if (isScanning) {
      // setIsModalOpen(false);
      Animated.timing(scanBtnAnimation, {
        toValue: 1.5,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(scanBtnAnimation, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
      // setIsModalOpen(true);
    }
  }, [isScanning]);

  const _closeCamera = () => {
    dispatch(setScannedIngredients([]));
    navigation.navigate('Recipes Suggestion');
    dispatch(setHideTabBar(false));
  };

  // Render the scanned list when the scan is completed
  const _openScannedList = () => setShowScannedList(!showScannedList);

  // Handle the done button in the scanned list
  const _onScannedListDone = () => {
    setShowScannedList(false);
    // setScannedItems([]);
    dispatch(setScannedIngredients([]));
    // dispatch(addIngredients(ingredients));
  };

  // Builds the scanned list modal when the scanning is finished.
  const _buildScannedList = () => {
    return (
      <View style={styles.modal}>
        <NativeBaseProvider>
          <Slide in={showScannedList} placement="bottom" style={{}}>
            <ScannedListScreen
              onDone={_onScannedListDone}
              scannedItems={scannedItems}
            />
          </Slide>
        </NativeBaseProvider>
      </View>
    );
  };

  // Handle scan started
  const _onScanningStarted = () => {
    setShowScannedList(false);
    setIsScanning(true);
  };

  // Handle scan done
  const _onScanningStopped = async (recognizedIngs: string[]) => {
    // TODO: Change to use video instead of picture
    // Take a picture when the user stops scanning
    if (cameraActive) {
      // const photo = await camera.takePictureAsync();
      // Add the recognized ingredients to the list.
      const recognizedIngredients = recognizedIngs.map((item) => {
        const ingredient: Ingredient = {
          id: Math.random().toString(),
          name: item,
          quantity: 1,
          date: '',
          imgUrl: RecipesApi.getIngredientUrl(item),
        };
        return ingredient;
      });

      dispatch(setScannedIngredients(recognizedIngredients));
      setShowScannedList(true);
    }
  };

  const _buildScanningButton = () => {
    return (
      <NativeBaseProvider>
        <View style={styles.scanBtnContainer}>
          <Animated.View style={{ transform: [{ scale: scanBtnAnimation }] }}>
            <VStack>
              {/* TODO: Fix scanned list is shown when scan button is just clicked */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPressIn={_onScanningStarted}
                onPressOut={() => setIsScanning(false)}
              >
                {!showScannedList && (
                  <View style={styles.scanBtn}>
                    <AntDesign name="scan1" size={30} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            </VStack>
          </Animated.View>
        </View>
      </NativeBaseProvider>
    );
  };

  const _buildRecognizingIndicator = () => {
    return (
      <View style={styles.recognizingIndicator}>
        <View style={tailwind('w-full')}>
          <NativeBaseProvider>
            <Spinner
              color={GlobalStyleSheet.themeColor.backgroundColor}
              size="lg"
            />
          </NativeBaseProvider>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.camera}>
        <VisionCamera
          onBack={_closeCamera}
          onDone={_openScannedList}
          setCamera={(c) => setCameraActive(c)}
          status={{ scanning: isScanning }}
          onItemsDetected={(names) => {
            // add items uniquely to the list
            _onScanningStopped([...new Set(names)]);
          }}
          modelName={modelName}
        />
      </View>
      {_buildScannedList()}
      {!showScannedList && _buildScanningButton()}
      {!showScannedList && (
        <View style={styles.backBtnContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={_closeCamera}>
            <Entypo name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
      {isRecognizing && _buildRecognizingIndicator()}
      {/* {_buildRecognizingIndicator()} */}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('relative'),
  },
  camera: {
    ...tailwind('w-full h-full absolute'),
    backgroundColor: 'transparent',
  },
  modal: {
    ...tailwind('w-full h-full'),
  },
  scanBtnContainer: {
    ...tailwind('w-full absolute bottom-10 justify-center items-center'),
    zIndex: 2,
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
  },
  backBtnContainer: {
    ...tailwind(
      'absolute w-full flex flex-row justify-between items-center top-8 px-4'
    ),
  },
  backBtn: {
    ...tailwind('p-2 rounded-full'),
    backgroundColor: '#333333',
  },
  recognizingIndicator: {
    ...tailwind(
      'w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center'
    ),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ScanningScreen;
