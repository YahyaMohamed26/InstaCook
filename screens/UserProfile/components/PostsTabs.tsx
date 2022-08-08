import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { Box, NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import MyPosts from './MyPosts';
import SavedRecipes from './SavedRecipes';

const FirstRoute = () => <MyPosts />;

const SecondRoute = () => <SavedRecipes />;

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const PostsTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'My Posts' },
    { key: 'second', title: 'Saved Recipes' },
  ]);

  const _getTabColor = (i: number) =>
    index === i ? GlobalStyleSheet.themeColor.backgroundColor : '#c3c3c3';

  const _getTabIcon = (i: number) => {
    switch (i) {
      case 0:
        return (
          <MaterialCommunityIcons
            name="grid"
            size={24}
            color={_getTabColor(i)}
          />
        );

      case 1:
        return (
          <FontAwesome name="bookmark-o" size={24} color={_getTabColor(i)} />
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

export default PostsTabs;
