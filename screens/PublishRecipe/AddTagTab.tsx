import { Box, HStack, NativeBaseProvider, Text, VStack } from 'native-base';
import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const AddTagTabContent = ({ onPressFunction, currentTags }) => {
  const instState = [
    {
      title: 'Gluten Free',
      isCompleted: false,
    },
    {
      title: 'Keto',
      isCompleted: false,
    },
    {
      title: 'Vegeterian',
      isCompleted: false,
    },
    {
      title: 'Vegan',
      isCompleted: false,
    },
    {
      title: 'Lactose',
      isCompleted: false,
    },
    {
      title: 'Gluten Free',
      isCompleted: false,
    },
  ];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState('');

  const [addedlist, setAddedList] = React.useState([]);

  const handleAdd = (title: string) => {
    onPressFunction([...currentTags]);
  };
  const handleDelete = (title: string) => {
    const temp = addedlist.filter((item) => item.title !== title);
    onPressFunction(temp);
  };

  const addTag = (newTag: string) => {
    if (!(currentTags as Array<string>).some((item) => item === newTag)) {
      onPressFunction([...currentTags, newTag]);
    } else {
      var newArray = currentTags.filter(function (f) {
        return f !== newTag;
      });
      onPressFunction(newArray);
    }
    console.log(currentTags);
  };

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <Box style={{ width: width, padding: 10, top: 10 }}>
      <VStack
        space={10}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <HStack space={20}>
          <TouchableOpacity onPress={() => addTag('Vegan')}>
            <VStack style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={styles.vectorImage}
                source={require('../../assets/filter/vegan.png')}
              ></Image>
              <Text
                style={[
                  { justifyContent: 'center', alignItems: 'center' },
                  currentTags.includes('Vegan')
                    ? { color: 'red' }
                    : { color: 'black' },
                ]}
              >
                Vegan
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addTag('Vegeterian')}>
            <VStack style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={styles.vectorImage}
                source={require('../../assets/filter/vegeterian.png')}
              ></Image>
              <Text
                style={[
                  { justifyContent: 'center', alignItems: 'center' },
                  currentTags.includes('Vegeterian')
                    ? { color: 'red' }
                    : { color: 'black' },
                ]}
              >
                Vegeterian
              </Text>
            </VStack>
          </TouchableOpacity>
        </HStack>
        <HStack space={20}>
          <TouchableOpacity onPress={() => addTag('Lactose')}>
            <VStack style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={styles.vectorImage}
                source={require('../../assets/filter/dairyfree.png')}
              ></Image>
              <Text
                style={[
                  { justifyContent: 'center', alignItems: 'center' },
                  currentTags.includes('Lactose')
                    ? { color: 'red' }
                    : { color: 'black' },
                ]}
              >
                Lactose Free
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addTag('Gluten')}>
            <VStack>
              <Image
                style={styles.vectorImage}
                source={require('../../assets/filter/glutenfree.png')}
              ></Image>
              <Text
                style={[
                  { justifyContent: 'center', alignItems: 'center' },
                  currentTags.includes('Gluten')
                    ? { color: 'red' }
                    : { color: 'black' },
                ]}
              >
                Gluten Free
              </Text>
            </VStack>
          </TouchableOpacity>
        </HStack>
        <HStack space={20}>
          <TouchableOpacity onPress={() => addTag('Keto')}>
            <VStack style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={styles.vectorImage}
                source={require('../../assets/filter/keto.png')}
              ></Image>
              <Text
                style={[
                  { justifyContent: 'center', alignItems: 'center' },
                  currentTags.includes('Keto')
                    ? { color: 'red' }
                    : { color: 'black' },
                ]}
              >
                Keto Free
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addTag('Dairy')}>
            <VStack style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={styles.vectorImage}
                source={require('../../assets/filter/dairyfree.png')}
              ></Image>
              <Text
                style={[
                  { justifyContent: 'center', alignItems: 'center' },
                  currentTags.includes('Dairy')
                    ? { color: 'red' }
                    : { color: 'black' },
                ]}
              >
                Dairy Free
              </Text>
            </VStack>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </Box>
  );
};

export default function AddTagTab({ onPressFunction, currentTags }) {
  return (
    <NativeBaseProvider>
      <AddTagTabContent
        onPressFunction={onPressFunction}
        currentTags={currentTags}
      />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  vectorImage: {
    width: 50,
    height: 50,
  },
});
