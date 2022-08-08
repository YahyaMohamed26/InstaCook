import { View, Text } from 'native-base';
import React, { FC } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import Recipe from '../models/recipe';

interface Props {
  data: Array<Recipe>;
  spacingX?: number;
  spacingY?: number;
  numOfCols: number;
  itemRenderer: (item: Recipe) => JSX.Element;
}

// Used as the default spacing for the grid
// when no spacing is passed in.
const DEFAULT_SPACING = 10;

const RecipesGrid: FC<Props> = (props, { navigation }) => {
  /**
   * Render function for the FlatList.
   * @param param0
   * @returns
   */
  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {
            marginHorizontal: props.spacingX ?? DEFAULT_SPACING,
            marginVertical: props.spacingY ?? DEFAULT_SPACING,
            width: Dimensions.get('window').width / 2.4,
          },
        ]}
      >
        {props.itemRenderer(item)}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={_renderItem}
        numColumns={props.numOfCols}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={() => (
          <View flex={1} justifyContent="center" alignItems="center" pt={100}>
            <Text>No items available!</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('flex-1 p-2 mb-8'),
  },
  contentContainer: {
    // To avoid items being cut off at the bottom of the screen
    // since the tabbar has a height of 60.
    paddingBottom: 60,
  },
  item: {
    ...tailwind('flex-1 flex-col'),
    borderRadius: 10,
  },
});

export default RecipesGrid;
