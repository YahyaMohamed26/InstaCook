import { FlatList } from 'native-base';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import tailwind from 'tailwind-rn';
import Ingredient from '../../../models/ingredient';
import MissingItem from './MissingItem';

interface IProps {
  items: Ingredient[];
}

const MissingIngredients: FC<IProps> = (props) => {
  const { items } = props;
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <MissingItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('flex-1 w-full bg-white'),
  },
});

export default MissingIngredients;
