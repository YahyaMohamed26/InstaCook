import * as GoogleAuthentication from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  UserCredential,
} from 'firebase/auth';
import { Platform } from 'react-native';
import User from '../../models/user';
import db from '../db/db';
import { auth } from '../firebase';

enum LogginType {
  EMAIL_PASSWORD = 1,
  GOOGLE,
  FACEBOOK,
}

const setIsFirstLoggin = async (userId: string) => {
  try {
    await AsyncStorage.setItem(userId, userId);
  } catch (e) {
    // saving error
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const userDetails = await db.getUser(user.user.uid);
    return userDetails;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<UserCredential> => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    // console.log('error', user);
    return user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Email already in use');
      throw new Error('Email already in use!');
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address!');
    }
    console.log(error);
    throw new Error("Couldn't sign up!");
  }
};

export const signUpWithFb = async (): Promise<UserCredential> => {
  return null;
};

export const signInwithGoogle = async (): Promise<User> => {
  try {
    const androidClientId =
      '1056653965534-u90bkd49h3r6i7o4g8toftpd3h09agk1.apps.googleusercontent.com';
    const iosClientId =
      '1056653965534-6j015olrqgdq67d81617c8ric5vmnd62.apps.googleusercontent.com';

    const res = await GoogleAuthentication.logInAsync({
      clientId: Platform.OS === 'ios' ? iosClientId : androidClientId,
      scopes: ['profile', 'email'],
    });

    if (res.type === 'success') {
      const credential = GoogleAuthProvider.credential(
        res.idToken,
        res.accessToken
      );

      const creds = await signInWithCredential(auth, credential);
      const existingUser = await db.getUser(creds.user.uid);
      if (!existingUser) {
        const newUser = User.fromFirebase(creds);
        await db.upsertUser(newUser);
        await setIsFirstLoggin(newUser.id);
        return newUser;
      }
      // Create user creds on firestore
      return existingUser;
    }
    return null;
  } catch ({ message }) {
    console.log('error', message);
  }
};

export const logout = async () => {
  try {
    const res = await signOut(auth);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
