import React from 'react';
import { Text, View } from 'react-native';
import { useAppSelector } from './store/hooks';
import { selectIngredientsList } from './store/slices/IngredientsListSlice';

const UpdateSuggestions = () => {
  const ings = useAppSelector(selectIngredientsList);
  console.log('ings', ings);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default UpdateSuggestions;
