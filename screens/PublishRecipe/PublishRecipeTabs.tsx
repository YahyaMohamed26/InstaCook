import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';

import { Box, NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import AddDetailTab from './AddDetailTab';
import AddDirectionTab from './AddDirectionTab';
import AddIngredientTab from './AddIngredientTab';
import AddTagTab from './AddTagTab';

const PublishRecipeTabs = ({
  currentDetails,
  setIngredients,
  setDirections,
  setTabs,
  setDetails,
}) => {
  const initialLayout = { width: Dimensions.get('window').width };

  const FirstRoute = () => (
    <AddIngredientTab
      currentIngredients={currentDetails.ingredients}
      onPressFunction={setIngredients}
    />
  );

  const SecondRoute = () => (
    <AddDirectionTab
      currentDirections={currentDetails.directions}
      onPressFunction={setDirections}
    />
  );

  const ThirdRoute = () => (
    <AddTagTab currentTags={currentDetails.tags} onPressFunction={setTabs} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Ingredients' },
    { key: 'second', title: 'Directions' },
    { key: 'third', title: 'Tags' },
  ]);

  const _getTabColor = (i: number) =>
    index === i ? GlobalStyleSheet.themeColor.backgroundColor : '#c3c3c3';

  const _getTabIcon = (i: number) => {
    switch (i) {
      case 0:
        return (
          <MaterialCommunityIcons
            name="food-variant"
            size={24}
            color={_getTabColor(i)}
          />
        );

      case 1:
        return <FontAwesome name="list-ol" size={24} color={_getTabColor(i)} />;

      case 2:
        return <AntDesign name="tag" size={24} color={_getTabColor(i)} />;
      case 3:
        return (
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color={_getTabColor(i)}
          />
        );
      default:
        return null;
    }
  };

  const _renderTabBar = (props) => {
    return (
      <Box flexDirection="row" style={styles.constainer}>
        {props.navigationState.routes.map((route, i: number) => {
          return (
            <Pressable
              onPress={() => setIndex(i)}
              style={{ flex: 1 }}
              key={route.key}
            >
              <Box
                borderBottomWidth="2"
                borderColor={_getTabColor(i)}
                alignItems="center"
                justifyContent="center"
                p="3"
              >
                {_getTabIcon(i)}
              </Box>
            </Pressable>
          );
        })}
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  constainer: {
    // ...tailwind('flex-row justify-center'),
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PublishRecipeTabs;
