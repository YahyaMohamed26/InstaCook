import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import { useAppSelector } from '../../store/hooks';
import { selectHideTabBar } from '../../store/slices/sharedSlice';
import IngredientListScreen from '../IngredientList/IngredientListScreen';
import TutorialPages from '../OpeningPage/TutorialPages';
import PublishRecipeMain from '../PublishRecipe/PublishRecipeScreen';
import RecipeDetailsScreenMain from '../RecipeDetails/RecipeDetailScreenMain';
import RecipeSuggestionScreen from '../RecipeSuggestion/RecipeSuggestionScreen';
import ScanningScreen from '../Scanning/ScanningScreen';
import ShoppingListScreen from '../ShoppingList/ShoppingListScreen';
import UserProfileScreen from '../UserProfile/UserProfileScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const Tutorial = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Tutorial"
        component={TutorialPages}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="TabBar"
        component={TabBar}
      />

      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Publish Recipe"
        component={PublishRecipeMain}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Publish Recipe Details"
        component={RecipeDetailsScreenMain}
      />
    </HomeStack.Navigator>
  );
};

const TabBar = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const hideTabBarAnim = useRef(new Animated.Value(0)).current;

  // The tab bar need to be hidden in some screens. i.e. when the camera is open.
  const hideTabBar = useAppSelector(selectHideTabBar);
  // Listen to the store for chnages in hideTabBar.
  // When the value changes, animate the tab bar.
  // TODO: Fix acive bar indicator at the bottom doesn't change when camera is closed.
  useEffect(() => {
    if (hideTabBar) {
      Animated.timing(hideTabBarAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
      }).start();
      // Change the position of the bottom tab indicator
      // to be moved under the recipe suggestion tab.
      onTabChanged(tabOffsetValue).tabPress();
    } else {
      Animated.timing(hideTabBarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  });

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            ...styles.tabBarStyle,
            transform: [
              {
                translateY: hideTabBarAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100],
                }),
              },
            ],
          },
        }}
      >
        <Tab.Screen
          name={'Recipes Suggestion'}
          component={RecipeSuggestionScreen}
          options={getTabOptions('home')}
          listeners={onTabChanged(tabOffsetValue)}
        />
        <Tab.Screen
          name={'Shopping List'}
          component={ShoppingListScreen}
          options={getTabOptions('shopping-cart')}
          listeners={onTabChanged(tabOffsetValue, getWidth())}
        />
        <Tab.Screen
          name={'Scanning Screen'}
          component={ScanningScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: 'absolute',
                  top: '-50%',
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      GlobalStyleSheet.themeColor.backgroundColor,
                    borderRadius: 1000,
                    height: 60,
                    width: 60,

                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    elevation: 4,
                  }}
                >
                  <AntDesign
                    name="scan1"
                    size={30}
                    color="white"
                    style={{
                      top: '25%',
                      left: '25%',
                    }}
                  />
                </View>
              </View>
            ),
          }}
          listeners={onTabChanged(tabOffsetValue, getWidth() * 2)}
        />
        <Tab.Screen
          name={'Ingredient Screen'}
          component={IngredientListScreen}
          options={getTabOptions('list')}
          listeners={onTabChanged(tabOffsetValue, getWidth() * 3)}
        />
        <Tab.Screen
          name={'Profile'}
          component={UserProfileScreen}
          options={getTabOptions('user')}
          listeners={onTabChanged(tabOffsetValue, getWidth() * 4)}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
          position: 'absolute',
          bottom: 10,
          left: 30,
          borderRadius: 20,
          transform: [
            {
              translateX: tabOffsetValue,
            },
            {
              translateY: hideTabBarAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
              }),
            },
          ],
        }}
      />
    </>
  );
};

// Returns tab options with given icon name.
// header is set to false by default.
const getTabOptions = (iconName: string, headerShown = false) => {
  return {
    headerShown,
    tabBarIcon: ({ focused }) => (
      <View style={{ position: 'relative' }}>
        <FontAwesome5
          name={iconName}
          size={20}
          color={
            focused ? GlobalStyleSheet.themeColor.backgroundColor : 'black'
          }
        />
      </View>
    ),
  };
};

// Updates tabbar slider when current tab is changed.
const onTabChanged = (tabOffsetValue: Animated.Value, toValue = 0) => {
  return {
    //on press update tab bar slider
    tabPress: () => {
      Animated.spring(tabOffsetValue, {
        toValue,
        useNativeDriver: true,
      }).start();
    },
  };
};

function getWidth() {
  let width = Dimensions.get('window').width;
  width = width - 40;
  return width / 5;
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 10,
    marginHorizontal: 20,
    height: 60,
    borderRadius: 10,

    borderWidth: 0,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 5,
  },
});

export default Tutorial;
