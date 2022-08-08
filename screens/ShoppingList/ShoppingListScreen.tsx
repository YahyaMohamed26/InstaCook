import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import {
  FlatList,
  HStack,
  NativeBaseProvider,
  Spinner,
  StatusBar,
  Text,
  View,
} from 'native-base';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import Ingredient from '../../models/ingredient';
import db from '../../services/db/db';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';
import {
  addShoppingItem,
  deleteShoppingItem,
  selectShoppingItemsList,
  setShoppingItemsList,
  updateShoppingItem,
} from '../../store/slices/shoppingListSlice';
import NewItem from '../IngredientList/components/NewItem';
import ShoppingList from '../ShoppingList/components/ShoppingList';
import IngredientRequestScreen from './components/IngredientRequestScreen';
import ShoppingItem from './components/ShoppingItem';

const shoppingTabs = [
  { name: 'Shopping List', component: () => <ShoppingList /> },
  { name: 'Ingredient Requests', component: () => <IngredientRequestScreen /> },
];

const ShoppingListScreen = () => {
  const shoppingItems = useAppSelector(selectShoppingItemsList);
  const [adding, setAdding] = React.useState(false);

  // const addNewItem = (newItem: Ingredient) => {
  //   setShoppingItems([...shoppingItems, newItem]);
  //   setAdding(false);
  // };

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isFetchingShoppingList, setIsFetchingShoppingList] =
    React.useState(false);
  // const [ingItems, setIngItems] = React.useState(dummyIngredients);

  // useEffect(() => {
  //   setIsFetchingShoppingList(true);
  //   const fetchShoppingList = async () => {
  //     const items = await db.getUserShoppingListItems(user.id);
  //     console.log('items ====> ', items);
  //     dispatch(setShoppingItemsList(items));
  //     setIsFetchingShoppingList(false);
  //   };

  //   fetchShoppingList();
  // }, []);

  const addNewItem = async (item: Ingredient) => {
    if (shoppingItems.some((ing) => ing.name === item.name)) {
      alert('Item already exists');
      return;
    }
    setAdding(false);
    setIsLoading(true);
    // console.log('newItem', newItem);
    // const newItemId = await db.addToUserShoppingList(user.id, newItem);
    await dispatch(addShoppingItem({ item, userId: user.id }));
    setIsLoading(false);
    // dispatch(addShoppingItem({ ...newItem, id: newItemId }));
  };

  const updateItem = async (item: Ingredient) => {
    await db.updateUserIngredient(user.id, item);
    // dispatch(updateItem(item));
  };

  const deleteItem = async (itemId: string) => {
    setIsDeleting(true);
    await dispatch(deleteShoppingItem({ userId: user.id, itemId }));
    setIsDeleting(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 25 }}>
      <NativeBaseProvider>
        <View style={styles.titleContainer}>
          <HStack
            alignItems={'center'}
            justifyContent="space-between"
            width={'100%'}
          >
            <View></View>
            <Text style={styles.title}>Shopping List</Text>
            <TouchableOpacity onPress={() => setAdding(!adding)}>
              <MaterialIcons
                name={adding ? 'close' : 'add'}
                color={GlobalStyleSheet.themeColor.backgroundColor}
                size={24}
              />
            </TouchableOpacity>
          </HStack>
        </View>

        {isFetchingShoppingList ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spinner color={GlobalStyleSheet.themeColor.backgroundColor} />
          </View>
        ) : (
          <View style={styles.container}>
            <FlatList
              style={styles.itemsList}
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingBottom: 100,
                flexGrow: 1,
              }}
              ListEmptyComponent={() => (
                <View flex={1} justifyContent="center" alignItems="center">
                  <Text>
                    You don't have any ingredients in shopping list yet!
                  </Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              data={shoppingItems}
              // ListHeaderComponent={() =>
              //   adding ? <NewItem onItemAdded={addNewItem} /> : null
              // }

              ListHeaderComponent={() => {
                if (adding) {
                  return <NewItem onItemAdded={addNewItem} />;
                }
                if (isLoading) {
                  return (
                    <Spinner
                      color={GlobalStyleSheet.themeColor.backgroundColor}
                      size={30}
                    />
                  );
                }
                return null;
              }}
              ListHeaderComponentStyle={{ marginBottom: adding ? 20 : 0 }}
              renderItem={({ item }) => (
                <ShoppingItem item={item} key={item.id} />
              )}
            />
          </View>
        )}
      </NativeBaseProvider>
      <StatusBar backgroundColor={'white'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  titleContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,

    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  itemsList: {
    width: '100%',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    //   textAlign: 'center',
  },
});

export default ShoppingListScreen;
