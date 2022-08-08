import React from 'react';
import {
  VStack,
  Center,
  Heading,
  NativeBaseProvider,
  Input,
  HStack,
  Text,
} from 'native-base';
import { TextInput, Dimensions } from 'react-native';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export function Example({ onPressFunction }) {
  const recipeDetails = { calorie: '', quantity: '', time: '' };

  return (
    <VStack space={10} alignItems="center">
      <Center
        width={width / 1.2}
        h="20"
        backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
        rounded="md"
        shadow={3}
      >
        <HStack justifyContent="center" alignItems="center">
          <Text marginRight={10}>Calorie</Text>
          <Input
            backgroundColor="white"
            width={width / 2}
            placeholder="Calories"
            keyboardType="numeric"
            onChangeText={(val) => {
              recipeDetails.calorie = val;
              onPressFunction(recipeDetails);
            }}
          ></Input>
        </HStack>
      </Center>
      <Center
        width={width / 1.2}
        h="20"
        backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
        rounded="md"
        shadow={3}
      >
        <HStack justifyContent="center" alignItems="center">
          <Text marginRight={5}>Time (min)</Text>
          <Input
            backgroundColor="white"
            width={width / 2}
            placeholder="Minutes"
            keyboardType="numeric"
            onChangeText={(val) => {
              recipeDetails.time = val;
              onPressFunction(recipeDetails);
            }}
          ></Input>
        </HStack>
      </Center>
      <Center
        width={width / 1.2}
        h="20"
        backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
        rounded="md"
        shadow={3}
      >
        <HStack justifyContent="center" alignItems="center">
          <Text marginRight={10}>Quantity</Text>
          <Input
            backgroundColor="white"
            width={width / 2}
            placeholder="Quantity"
            keyboardType="numeric"
            onChangeText={(val) => {
              recipeDetails.quantity = val;
              onPressFunction(recipeDetails);
            }}
          ></Input>
        </HStack>
      </Center>
    </VStack>
  );
}

export default function AddDetailTab({ onPressFunction }) {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example onPressFunction={onPressFunction} />
      </Center>
    </NativeBaseProvider>
  );
}
