import { Ionicons } from '@expo/vector-icons';
import {
  Button,
  FormControl,
  Icon,
  Input,
  Pressable,
  Spinner,
  Stack,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import User from '../../../models/user';
import { signIn, signInwithGoogle } from '../../../services/auth/auth';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/slices/authSlice';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import db from '../../../services/db/db';
import { setIsFetchingUserDetails } from '../../../store/slices/sharedSlice';
import { setIngredients } from '../../../store/slices/IngredientsListSlice';
import { setShoppingItemsList } from '../../../store/slices/shoppingListSlice';
import { setFilters, setUserFilters } from '../../../store/slices/recipeSlice';

const LoginScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [isLogginInWithGoogle, setIsLoggingInWithGoogle] = useState(false);
  const [isLogginIn, setIsLoggingIn] = useState(false);

  const formData = {
    email: '',
    password: '',
  };

  const [error, setError] = useState('');

  const onSignIn = async () => {
    if (formData.email.length === 0) {
      setError('Email is required');
      return;
    }
    if (formData.password.length === 0) {
      setError('Password is required');
      return;
    }
    setError('');

    try {
      setIsLoggingIn(true);
      const user = await signIn(formData.email, formData.password);
      if (!user) {
        setError('Invalid email or password.');
        return;
      }

      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const onSignInWithGoogle = async () => {
    try {
      setIsLoggingInWithGoogle(true);
      const user = await signInwithGoogle();
      dispatch(setIsFetchingUserDetails(true));
      const userInfo = await db.getUserInfo(user.id);
      dispatch(setUserFilters(userInfo.filters));
      dispatch(setIngredients(userInfo.ingredients));
      dispatch(setShoppingItemsList(userInfo.shoppingList));
      dispatch(setIsFetchingUserDetails(false));

      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingInWithGoogle(false);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Stack space={4} w="100%" alignItems="center" marginTop="50" px={10}>
          <FormControl isInvalid={!!error} w="100%">
            <Input
              placeholder="Email"
              backgroundColor="white"
              borderRadius="10"
              onChangeText={(val) => (formData.email = val)}
            />
          </FormControl>
          <FormControl isInvalid={!!error} w="100%">
            <Input
              type="password"
              placeholder="Password"
              backgroundColor="white"
              borderRadius="10"
              onChangeText={(val) => (formData.password = val)}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {error}
            </FormControl.ErrorMessage>
          </FormControl>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}
          >
            <Pressable>
              <Text style={styles.textStyle}>Forgot Password?</Text>
            </Pressable>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSignIn}
            disabled={isLogginIn || isLogginInWithGoogle}
            // onPress={() => navigation.navigate(screens.Home.name as never)}
          >
            <Button
              style={styles.loginButton}
              _text={{
                fontWeight: 'bold',
              }}
            >
              {isLogginIn ? <Spinner color="white" /> : 'Login'}
            </Button>
          </TouchableOpacity>
          <Text style={styles.orStyle}>Or</Text>
          {/* <TouchableOpacity>
            <Button
              leftIcon={<Icon as={Ionicons} name="logo-facebook" size="sm" />}
              style={styles.loginFace}
              _text={{
                fontWeight: 'bold',
              }}
            >
              Login with Facebook
            </Button>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={onSignInWithGoogle}
            disabled={isLogginIn || isLogginInWithGoogle}
          >
            <Button
              style={styles.loginGoogle}
              _text={{
                color: '#F8774A',
                fontWeight: 'bold',
              }}
              leftIcon={
                isLogginInWithGoogle ? (
                  <Spinner color="#F8774A" />
                ) : (
                  <Icon
                    as={Ionicons}
                    name="logo-google"
                    size="sm"
                    color="#F8774A"
                  />
                )
              }
            >
              Login With Google
            </Button>
          </TouchableOpacity>
        </Stack>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ECECEC',
  },
  textStyle: {
    color: '#F8774A',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: '#F8774A',
    width: 290,
    borderRadius: 20,
  },
  orStyle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  loginFace: {
    backgroundColor: '#4267B2',
    width: 290,
    borderRadius: 20,
  },
  loginGoogle: {
    backgroundColor: 'white',
    width: 290,
    borderRadius: 20,
  },
});

export default LoginScreen;
