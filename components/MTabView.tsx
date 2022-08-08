import { Box, NativeBaseProvider } from 'native-base';
import * as React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import GlobalStyleSheet from '../constants/GlobalStyleSheet';

const initialLayout = { width: Dimensions.get('window').width };

interface Props {
  tabs: Array<Record<string, unknown>>;
  tabLabelStyles?: ViewStyle;
  tabbarStyles?: ViewStyle;
}

/**
 * A tab view component that displays a list of tabs.
 *
 * @param props holds the tabs and tab label styles.
 *              tabbs should be provided as the following format:
                const tabs = [
                  { name: 'Tab 1', component: () => <FirstComponent />  },
                  { name: 'Tab 2', component: () => <SecondComponent /> },
                  ...
                ];
 * @returns 
 */
const MTabView: React.FC<Props> = (props) => {
  // Construct a scene map from the tabs provided in props.
  const scene = {};
  props.tabs.forEach(
    (item, index) => (scene[item.name as string] = item.component)
  );
  const renderScene = SceneMap(scene);
  const [index, setIndex] = React.useState(0);
  /// Extract the names of the tabs as a {name: name} object.
  // the key is used as the key to match with the tabs.
  // Since the tabs are constructed in {name: component} format.
  const [routes] = React.useState([
    ...props.tabs.map((item, index) => {
      return { key: item.name, title: item.name };
    }),
  ]);

  const _getTabColor = (i: number) =>
    index === i ? GlobalStyleSheet.themeColor.backgroundColor : '#a4a4a4';

  // const _getTabIcon = (i: number) => {
  //   switch (i) {
  //     case 0:
  //       return (
  //         <MaterialCommunityIcons
  //           name="grid"
  //           size={24}
  //           color={_getTabColor(i)}
  //         />
  //       );

  //     case 1:
  //       return (
  //         <FontAwesome name="bookmark-o" size={24} color={_getTabColor(i)} />
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const _renderTabBar = (routeProps) => {
    return (
      <Box flexDirection="row" style={[styles.constainer, props.tabbarStyles]}>
        {routeProps.navigationState.routes.map((route, i: number) => {
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
                {/* {_getTabIcon(i)} */}
                <Text
                  style={[
                    props.tabLabelStyles ?? styles.tabText,
                    { overflow: 'hidden', color: _getTabColor(i) },
                  ]}
                >
                  {route.title}
                </Text>
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
    fontWeight: '700',
    color: 'gray',
  },
});

export default MTabView;
