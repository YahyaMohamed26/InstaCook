import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  HStack,
  NativeBaseProvider,
  Spinner,
  Text,
  View,
} from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RecipesApi from '../../api/recipesApi';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import Ingredient from '../../models/ingredient';
import db from '../../services/db/db';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';
import {
  addIngredientItem,
  removeIngredientItem,
  selectIngredientsList,
  setIngredients,
  updateIngredient,
} from '../../store/slices/IngredientsListSlice';
import IngredientItem from './components/IngredientItem';
import NewItem from './components/NewItem';

const IngredientListScreen = () => {
  const ingItems = useAppSelector(selectIngredientsList);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isFetchingIngredients, setIsFetchingIngredients] =
    React.useState(false);
  // const [ingItems, setIngItems] = React.useState(dummyIngredients);
  const [adding, setAdding] = React.useState(false);

  // useEffect(() => {
  //   const fetchIngredients = async () => {
  //     const ingredients = await db.getUserIngredients(user.id);
  //     dispatch(setIngredients(ingredients));
  //     setIsFetchingIngredients(false);
  //   };
  //   if (ingItems.length === 0) {
  //     setIsFetchingIngredients(true);
  //     fetchIngredients();
  //   }
  // }, []);

  const addNewItem = async (item: Ingredient) => {
    if (ingItems.some((ing) => ing.name === item.name)) {
      alert('Item already exists');
      return;
    }
    setAdding(false);
    setIsLoading(true);
    if (!item.imgUrl) {
      item.imgUrl = RecipesApi.getIngredientUrl(item.name.toLowerCase());
    }
    await dispatch(addIngredientItem({ item, userId: user.id }));
    setIsLoading(false);
  };

  const updateItem = async (item: Ingredient) => {
    // await db.updateUserIngredient(user.id, item);
    // dispatch(updateIngredient(item));
    await dispatch(updateIngredient({ userId: user.id, item }));
  };

  const deleteItem = async (itemId: string) => {
    await dispatch(removeIngredientItem({ userId: user.id, itemId }));
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: 25 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.titleContainer}>
            <HStack
              alignItems={'center'}
              justifyContent="space-between"
              width={'100%'}
            >
              <View></View>
              <Text style={styles.title}>Ingredient List</Text>
              <TouchableOpacity onPress={() => setAdding(!adding)}>
                <MaterialIcons
                  name={adding ? 'close' : 'add'}
                  color={GlobalStyleSheet.themeColor.backgroundColor}
                  size={24}
                />
              </TouchableOpacity>
            </HStack>
          </View>

          {isFetchingIngredients ? (
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
                  // paddingTop: 15,
                  paddingHorizontal: 15,
                  flexGrow: 1,
                }}
                ListEmptyComponent={() => (
                  <View flex={1} justifyContent="center" alignItems="center">
                    <Text>You don't have any ingredients yet!</Text>
                  </View>
                )}
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
                ListHeaderComponentStyle={{
                  marginBottom: 15,
                  paddingTop: adding ? 10 : 0,
                }}
                data={ingItems}
                renderItem={({ item }) => (
                  <IngredientItem
                    item={item}
                    key={item.id}
                    onSave={updateItem}
                    onDelete={deleteItem}
                  />
                )}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
      <StatusBar
        backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
      />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: Dimensions.get('window').width,
  },
  titleContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemsList: {
    width: '100%',
    // padding: 20,
  },
  addButton: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default IngredientListScreen;
