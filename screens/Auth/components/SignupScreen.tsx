import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  Button,
  CloseIcon,
  Collapse,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  NativeBaseProvider,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import User from '../../../models/user';
import {
  signInwithGoogle,
  signUp,
  signUpWithFb,
} from '../../../services/auth/auth';
import db from '../../../services/db/db';
import { setUser } from '../../../store/slices/authSlice';

const SignupScreen = ({ navigation }) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [signupError, setSignupError] = useState('');
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);

  const formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const formErrors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async () => {
    try {
      const userCreds = await signUp(
        formData.email,
        formData.password,
        formData.name
      );
      const user = User.fromFirebase(userCreds);
      const createUserInDb = await db.upsertUser({
        ...user,
        name: formData.name,
      });
      if (!createUserInDb) {
        setSignupError('Error creating user in db!');
        return;
      }
      dispatch(setUser({ ...user, name: formData.name }));
    } catch (error: any) {
      setSignupError(error.message as string);
    }
  };

  const signupWithGoogle = async () => {
    setIsSigningInWithGoogle(true);
    const user = await signInwithGoogle();
    dispatch(setUser(user));
  };

  return (
    <NativeBaseProvider>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Stack space={4} w="100%" alignItems="center" pt={3} px={10}>
            <Collapse p={0} m={0} w="100%" isOpen={!!signupError}>
              <Alert w="100%" status="error">
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    justifyContent="space-between"
                  >
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon mt="1" />
                      <Text fontSize="md" color="coolGray.800">
                        {signupError}
                      </Text>
                    </HStack>
                    <IconButton
                      variant="unstyled"
                      icon={<CloseIcon size="3" color="coolGray.600" />}
                      onPress={() => setSignupError('')}
                    />
                  </HStack>
                </VStack>
              </Alert>
            </Collapse>
            <FormControl isInvalid={!!formErrors.name} w="100%">
              <Input
                placeholder="Full Name"
                backgroundColor="white"
                borderRadius="10"
                onChangeText={(val) => (formData.name = val)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {formErrors.name}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formErrors.email} w="100%">
              <Input
                backgroundColor="white"
                placeholder="Email Address"
                borderRadius="10"
                onChangeText={(val) => (formData.email = val)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Try different from previous passwords.
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors.password} w="100%">
              <Input
                type="password"
                backgroundColor="white"
                placeholder="Password"
                borderRadius="10"
                onChangeText={(val) => (formData.password = val)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Try different from previous passwords.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formData.confirmPassword !== formData.password}
              w="100%"
            >
              <Input
                type="password"
                backgroundColor="white"
                placeholder="Confirm Password"
                borderRadius="10"
                onChangeText={(val) => (formData.confirmPassword = val)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Passwords do not match.
              </FormControl.ErrorMessage>
            </FormControl>

            <TouchableOpacity
              // onPress={() =>
              //   navigator.navigate({
              //     name: screens.Home.name as never,
              //     key: '',
              //   })
              // }
              onPress={onSubmit}
            >
              <Button
                style={styles.loginButton}
                _text={{
                  fontWeight: 'bold',
                }}
              >
                Sign Up
              </Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={signupWithGoogle}>
              <Button
                style={styles.signUpGoogle}
                _text={{
                  color: '#F8774A',
                  fontWeight: 'bold',
                }}
                leftIcon={
                  isSigningInWithGoogle ? (
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
                Sign Up With Google
              </Button>
            </TouchableOpacity>
          </Stack>
        </View>
      </KeyboardAwareScrollView>
    </NativeBaseProvider>
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
  signUpFace: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  signUpGoogle: {
    backgroundColor: 'white',
    width: 290,
    borderRadius: 20,
  },
});
export default SignupScreen;
