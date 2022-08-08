import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import ForgetScreen from './ForgetScreen';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator();

const LoginNav = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer independent>
          <Stack.Navigator initialRouteName={'LoginScreen'}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default LoginNav;
