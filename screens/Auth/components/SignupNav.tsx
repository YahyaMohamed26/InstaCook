import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import SignupScreen from './SignupScreen';

const Stack = createNativeStackNavigator();

const SignupNav = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Stack.Navigator initialRouteName={'SignupScreen'}>
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </Provider>
    </SafeAreaProvider>
  );
};

export default SignupNav;
