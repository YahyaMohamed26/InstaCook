import { AntDesign, Feather } from '@expo/vector-icons';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
export const Example = ({ onPressFunction, currentDirections }) => {
  const [inputValue, setInputValue] = React.useState('');

  const addItem = () => {
    onPressFunction([...currentDirections, inputValue]);
    setInputValue('');
  };

  const handleDelete = (item: string) => {
    const temp = currentDirections.filter((i) => i !== item);
    onPressFunction(temp);
  };

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <Box style={{ width: width, padding: 10 }}>
      <VStack space={4}>
        <HStack space={2}>
          <Input
            flex={1}
            onChangeText={(v) => setInputValue(v)}
            value={inputValue}
            placeholder="Add a direction"
          />
          <IconButton
            borderRadius="lg"
            justifyContent="center"
            variant="solid"
            backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
            icon={<Icon as={Feather} name="plus" size="sm" color="white" />}
            onPress={addItem}
          />
        </HStack>
        <ScrollView>
          <VStack space={4}>
            {currentDirections.map((item, itemI) => (
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.title + itemI.toString()}
                pr={3}
              >
                <Text
                  mx="2"
                  fontSize="lg"
                  width={width / 1.3}
                  _light={{
                    color: item.isCompleted ? 'gray.600' : 'gray.600',
                  }}
                  _dark={{
                    color: item.isCompleted ? 'gray.600' : 'coolGray.50',
                  }}
                >
                  {itemI + 1} {item}
                </Text>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <AntDesign name="delete" size={20} color={'red'} />
                </TouchableOpacity>
                {/* <IconButton
                  marginRight={3}
                  size="sm"
                  colorScheme="trueGray"
                  icon={
                    <Icon
                      as={Feather}
                      name="trash-2"
                      size="sm"
                      color={GlobalStyleSheet.themeColor.backgroundColor}
                    />
                  }
                  onPress={() => handleDelete(itemI)}
                /> */}
              </HStack>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
};

export default function AddDirectionTab({
  onPressFunction,
  currentDirections,
}) {
  return (
    <NativeBaseProvider>
      <Example
        onPressFunction={onPressFunction}
        currentDirections={currentDirections}
      />
    </NativeBaseProvider>
  );
}
