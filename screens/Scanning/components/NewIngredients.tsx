import { FlatList } from 'native-base';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import tailwind from 'tailwind-rn';
import Ingredient from '../../../models/ingredient';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../store/slices/authSlice';
import {
  addIngredientItem,
  selectIngredientsList,
  selectScannedIngredients,
  setScannedIngredients,
} from '../../../store/slices/IngredientsListSlice';
import NewScannedItem from './NewScannedItem';

interface IProps {
  items: Ingredient[];
}

const NewIngredients: FC<IProps> = (props) => {
  // const [items, setItems] = React.useState([...props.items]);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  // const data = useAppSelector(selectSuggestedRecipes);
  const items = useAppSelector(selectScannedIngredients);
  const currentIngredients = useAppSelector(selectIngredientsList);

  const discardItem = (item: Ingredient) => {
    const newItems = items.filter((i) => i.id !== item.id);
    dispatch(setScannedIngredients(newItems));
    // setItems(newItems);
  };

  const confirmItem = async (item: Ingredient) => {
    if (
      !currentIngredients.some(
        (ing) => ing.name.toLowerCase() === item.name.toLowerCase()
      )
    ) {
      await dispatch(addIngredientItem({ userId: user.id, item }));
      discardItem(item);
    }
  };

  console.log('NewIngredients: items', items);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem ={({ item }) => (
          <NewScannedItem
            item={item}
            onDiscard={discardItem}
            onConfirm={confirmItem}
          />
        )}
        keyExtractor={(item, idx) => idx.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('flex-1 w-full bg-white'),
    marginBottom: 10,
  },
});
export default NewIngredients;
