import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppWrapper from './AppWrapper';
import store from './store/store';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
