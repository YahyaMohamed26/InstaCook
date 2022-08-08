import React from 'react';
import {
  Box,
  Spinner,
  HStack,
  Heading,
  Center,
  NativeBaseProvider,
  Text,
} from 'native-base';
import LottieView from 'lottie-react-native';
export const Example = () => {
  return <LottieView source={require('../../assets/loading.json')} autoPlay />;
};

export default function LoadingRecipeDetails() {
  return (
    <NativeBaseProvider>
      <Example />
    </NativeBaseProvider>
  );
}
