import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import screens from './screens';
import AuthScreen from './screens/Auth/AuthScreen';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectUser, setUser } from './store/slices/authSlice';
import { fetchIngredients } from './store/slices/IngredientsListSlice';
import { fetchFilters } from './store/slices/recipeSlice';
import { selectIsFetchingUserDetails } from './store/slices/sharedSlice';

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  const screensDetails = Object.entries(screens);
  const user = useAppSelector(selectUser);
  const isFetchingDetails = useAppSelector(selectIsFetchingUserDetails);
  const dispatch = useAppDispatch();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) dispatch(setUser(null));
      else {
        dispatch(fetchIngredients(currentUser.uid));
      }
    });
  });

  return (
    <NavigationContainer>
      {!user || isFetchingDetails ? (
        <AuthScreen />
      ) : (
        <Stack.Navigator initialRouteName={screens.Home.name}>
          {screensDetails.map(([name, screen]) => (
            <Stack.Screen {...screen} key={name} />
          ))}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppWrapper;
