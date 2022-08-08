import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import LoginNav from './components/LoginNav';
import SignupNav from './components/SignupNav';
import MTabView from '../../components/MTabView';
import images from '../../utils/assets';
import { useFonts } from 'expo-font';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';

const Authtabs = [
  { name: 'Login', component: () => <LoginNav /> },
  { name: 'Sign-up', component: () => <SignupNav /> },
];

const AuthScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.logoArea}>
          <Image source={images.logo} style={styles.logoStyle}></Image>
          <Text style={[styles.appNameText]}>InstaCook</Text>
        </View>
        <MTabView
          tabs={Authtabs}
          tabbarStyles={{
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            paddingHorizontal: 20,
            backgroundColor: 'white',
          }}
        />
      </View>
      <StatusBar
        backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginBottom: 200,
    flex: 1,
    borderRadius: 40,
    backgroundColor: '#ECECEC',
  },

  logoStyle: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  logoArea: {
    //marginTop: 10,
    //marginBottom:10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  appNameText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: GlobalStyleSheet.themeColor.backgroundColor,
  },
});

export default AuthScreen;
