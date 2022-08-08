import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import React from 'react';
import { useRef, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const NextButton = ({ percentage }) => {
  const size = 128;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          ></Circle>
          <Circle
            stroke="orange"
            ref={progressRef}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          ></Circle>
        </G>
      </Svg>

      <TouchableOpacity style={styles.button} activeOpacity={0.6}>
        <AntDesign name="arrowright" size={32} color="white"></AntDesign>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 70,
  },

  button: {
    position: 'absolute',
    backgroundColor: 'orange',
    borderRadius: 100,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NextButton;
