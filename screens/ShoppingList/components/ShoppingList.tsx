import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import {
  FlatList,
  IconButton,
  NativeBaseProvider,
  StatusBar,
} from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import Ingredient, { dummyIngredients } from '../../../models/ingredient';
import NewItem from '../../IngredientList/components/NewItem';
import ShoppingItem from '../../ShoppingList/components/ShoppingItem';

const ShoppingList = () => {
  const [ingItems, setIngItems] = React.useState(dummyIngredients);
  const [adding, setAdding] = React.useState(false);

  const addNewItem = (newItem: Ingredient) => {
    setIngItems([newItem, ...ingItems]);
    setAdding(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider></NativeBaseProvider>
      <StatusBar />
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
    paddingTop: 20,
  },
  itemsList: {
    width: '100%',
    padding: 20,
  },
  addButton: {
    borderRadius: 25,
    width: 50,
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ShoppingList;
