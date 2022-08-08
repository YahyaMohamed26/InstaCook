import React, { FC, useEffect } from 'react';
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  NativeBaseProvider,
  Divider,
  Menu,
  Pressable,
  HamburgerIcon,
  View,
  Spacer,
} from 'native-base';
import { Feather, Entypo, AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { MaterialIcons } from '@expo/vector-icons';
import IncDecButton from '../../components/IncDecButton';
import Ingredient from '../../models/ingredient';
import RecipesApi from '../../api/recipesApi';
export function DropDown() {
  return (
    <Box h="80%" marginLeft="10px" alignItems="flex-start">
      <Menu
        closeOnSelect={false}
        w="190"
        onOpen={() => console.log('opened')}
        onClose={() => console.log('closed')}
        trigger={(triggerProps) => {
          return (
            <Pressable {...triggerProps}>
              <MaterialIcons name="arrow-drop-down" size={30} color="black" />
            </Pressable>
          );
        }}
      >
        <Menu.OptionGroup
          defaultValue="Arial"
          title="MEAUSURING TYPE"
          type="radio"
        >
          <Menu.ItemOption value="Piece">Piece</Menu.ItemOption>
          <Menu.ItemOption value="teaSpoon">Tea Spoon</Menu.ItemOption>
          <Menu.ItemOption value="tableSpoon">Table Spoon</Menu.ItemOption>
        </Menu.OptionGroup>
      </Menu>
    </Box>
  );
}

export const Example = ({ onPressFunction }) => {
  const [list, setList] = React.useState<Array<Ingredient>>([]);

  const [inputValue, setInputValue] = React.useState('');

  const addItem = (title: string) => {
    // event.preventDefault();
    const newItem: Ingredient = {
      name: title,
      quantity: 0,
      id: new Date().getTime().toString(),
    };
    console.log([newItem, ...list]);
    list.push(newItem);
    onPressFunction([newItem, ...list]);
  };

  const handleDelete = (index: number) => {
    const temp = list.filter((_, itemI) => itemI !== index);
    setList(temp);
    onPressFunction(list.filter((_, itemI) => itemI !== index));
  };

  const increaseAmount = (index: number) => {
    const temp = list.map((item, itemI) =>
      itemI !== index ? item : { ...item, ingredientAmount: item.quantity + 1 }
    );
    setList(temp);
  };

  const decreaseAmount = (index: number) => {
    const temp = list.map((item, itemI) =>
      itemI !== index
        ? item
        : {
            ...item,
            ingredientAmount: item.quantity !== 0 ? item.quantity - 1 : 0,
          }
    );
    setList(temp);
  };

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <Box style={{ width: width, padding: 10, height: height / 2 - 50 }}>
      <VStack space={4}>
        <HStack space={2}>
          <Input
            flex={1}
            onChangeText={(v) => setInputValue(v)}
            value={inputValue}
            placeholder="Add an Ingredient"
          />
          <IconButton
            borderRadius="lg"
            justifyContent="center"
            variant="solid"
            backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
            icon={<Icon as={Feather} name="plus" size="sm" color="white" />}
            onPress={(event) => {
              addItem(inputValue);
              setInputValue('');
            }}
          />
        </HStack>
        <ScrollView contentContainerStyle={{ flexGrow: 0.5 }}>
          <VStack space={5}>
            {list.map((item, itemI) => (
              <HStack
                w="100%"
                alignItems="center"
                justifyContent="space-between"
                key={item.name + itemI.toString()}
              >
                <Text
                  mx="2"
                  fontSize={16}
                  width={width / 1.3}
                  // _light={{
                  //   color: item.isCompleted ? 'gray.400' : 'coolGray.500',
                  // }}
                  // _dark={{
                  //   color: item.isCompleted ? 'gray.400' : 'coolGray.50',
                  // }}
                >
                  {itemI + 1} {item.name}
                </Text>
                <IconButton
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
                />
                <HStack space={2} right="150px">
                  <IncDecButton
                    value={item.quantity}
                    increment={() => increaseAmount(itemI)}
                    decrement={() => decreaseAmount(itemI)}
                  />
                </HStack>
              </HStack>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
};

// export default function AddIngredientTab({ onPressFunction }) {
//   return (
//     <NativeBaseProvider>
//       <Example onPressFunction={onPressFunction} />
//     </NativeBaseProvider>
//   );
// }
interface IProps {
  onPressFunction: (list: Array<Ingredient>) => void;
  currentIngredients: Array<Ingredient>;
}

const AddIngredientTab: FC<IProps> = (props) => {
  const [ingredientName, setIngredientName] = React.useState('');

  const addIngredient = () => {
    const alreadyAdded = props.currentIngredients.some(
      (ing) => ing.name.toLowerCase() === ingredientName.toLowerCase()
    );
    if (alreadyAdded) return;

    const newItem: Ingredient = {
      name: ingredientName,
      quantity: 1,
      id: new Date().getTime().toString(),
      imgUrl: RecipesApi.getIngredientUrl(ingredientName.toLowerCase()),
    };
    setIngredientName('');
    props.onPressFunction([newItem, ...props.currentIngredients]);
  };

  const deleteItem = (item: Ingredient) => {
    props.onPressFunction(
      props.currentIngredients.filter((ing) => ing.id !== item.id)
    );
  };

  const increaseAmount = (item: Ingredient) => {
    const temp = props.currentIngredients.map((ing) =>
      ing.id === item.id ? { ...ing, quantity: ing.quantity + 1 } : ing
    );
    props.onPressFunction(temp);
  };

  const decreaseAmount = (item: Ingredient) => {
    const temp = props.currentIngredients.map((ing) =>
      ing.id === item.id
        ? { ...ing, quantity: ing.quantity !== 0 ? ing.quantity - 1 : 0 }
        : ing
    );
    props.onPressFunction(temp);
  };

  const buildIngredientItem = (ingredient: Ingredient, index: number) => {
    return (
      <HStack
        width={'100%'}
        alignItems="center"
        justifyContent={'space-between'}
        pr={5}
      >
        <HStack
          space={2}
          w="65%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text mx="2" fontSize={16} color="gray.600">
            {index + 1} {ingredient.name}
          </Text>
          <IncDecButton
            value={ingredient.quantity}
            increment={() => increaseAmount(ingredient)}
            decrement={() => decreaseAmount(ingredient)}
            containerStyles={{ padding: 0 }}
          />
        </HStack>

        <TouchableOpacity onPress={() => deleteItem(ingredient)}>
          <AntDesign name="delete" size={20} color={'red'} />
        </TouchableOpacity>
      </HStack>
    );
  };

  return (
    <VStack px={2} pt={3} space={3}>
      <HStack space={2}>
        <Input
          flex={1}
          onChangeText={(v) => setIngredientName(v)}
          value={ingredientName}
          placeholder="Add an Ingredient"
        />
        <IconButton
          borderRadius="lg"
          justifyContent="center"
          variant="solid"
          backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
          icon={<Icon as={Feather} name="plus" size="sm" color="white" />}
          onPress={addIngredient}
        />
      </HStack>
      <FlatList
        data={props.currentIngredients}
        renderItem={({ item, index }) => buildIngredientItem(item, index)}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginVertical: 10 }} />
        )}
      ></FlatList>
    </VStack>
  );
};

export default AddIngredientTab;
