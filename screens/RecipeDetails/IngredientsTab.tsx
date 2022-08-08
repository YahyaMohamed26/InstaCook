import { Entypo, FontAwesome } from '@expo/vector-icons';
import {
  Avatar,
  Box,
  HStack,
  Icon,
  NativeBaseProvider,
  Pressable,
  Spacer,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import Ingredient from '../../models/ingredient';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';
import { selectIngredientsList } from '../../store/slices/IngredientsListSlice';
import { addShoppingItem } from '../../store/slices/shoppingListSlice';

export default function IngredientsTab({ ingredients }) {
  const [mode, setMode] = useState('Basic');

  return (
    <NativeBaseProvider>
      <Box bg="white" flex="1" safeAreaTop>
        <Basic ingredients={ingredients} />
      </Box>
    </NativeBaseProvider>
  );
}

function Basic({ ingredients }) {
  const [listData, setListData] = useState(ingredients);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isAddingToShoppingList, setIsAddingToShoppingList] = useState(false);
  const userIngredients = useAppSelector(selectIngredientsList);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const addToShoppingList = async (item: Ingredient) => {
    setIsAddingToShoppingList(true);
    await dispatch(addShoppingItem({ userId: user.id, item }));
    setIsAddingToShoppingList(false);
  };

  const isMissing = (item) => {
    const isInUserIngredients = userIngredients.some((ing) => {
      return item.name.toLowerCase().includes(ing.name.toLowerCase());
      // ing.name.toLowerCase() === item.name.toLowerCase() ||
      // ing.name.toLowerCase() === item.name.toLowerCase() + 's'
    });
    return !isInUserIngredients;
  };

  const renderItem = ({ item, index }) => (
    <Box key={item.id}>
      <Pressable onPress={() => console.log('You touched me')} bg="white">
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar
              style={{ resizeMode: 'contain', backgroundColor: 'white' }}
              size="48px"
              source={{ uri: item.imgUrl }}
            />
            <VStack>
              <Text
                color={GlobalStyleSheet.globalTitleColor.color}
                _dark={{ color: 'warmGray.50' }}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
              <Text
                fontSize="xs"
                color="gray.500"
                _dark={{ color: 'warmGray.50' }}
              >
                {(item.quantity as number).toFixed(2)}{' '}
                {/* {item.ingredientMeasuring} */}
              </Text>
            </VStack>
            <Spacer />

            {isMissing(item) ? (
              <Entypo name="cross" size={20} color="red" />
            ) : (
              <Entypo name="check" size={20} color="#20B2AA" />
            )}
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="100"
        ml="auto"
        bg={GlobalStyleSheet.themeColor.backgroundColor}
        justifyContent="center"
        onPress={async () => {
          const ingItem: Ingredient = {
            id: '1',
            name: data.item.name,
            date: '',
            imgUrl: data.item.imgUrl,
            quantity: data.item.quantity,
          };
          await addToShoppingList(ingItem);
          closeRow(rowMap, data.item.id);
        }}
        _pressed={{
          opacity: 0.5,
        }}
      >
        {isAddingToShoppingList ? (
          <Spinner />
        ) : (
          <VStack alignItems="center">
            <Icon
              as={<FontAwesome name="plus" size={24} color="black" />}
              size="xs"
              color="coolGray.800"
              justifyContent="center"
              alignSelf="center"
              alignItems="center"
            />
            <Text
              fontSize="xs"
              fontWeight="medium"
              color="coolGray.800"
              textAlign="center"
              alignSelf="center"
            >
              Add to Shopping List
            </Text>
          </VStack>
        )}
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={listData}
        contentContainerStyle={{ paddingBottom: 70 }}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-100}
        previewRowKey={'0'}
        previewOpenValue={-10}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
        keyExtractor={(item, index) => index.toString()}
      />
    </Box>
  );
}
