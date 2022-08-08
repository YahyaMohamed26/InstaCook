import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  NativeBaseProvider,
  StatusBar,
  Button,
  IconButton,
  Stack,
  Input,
  Pressable,
  Icon,
} from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';

const ForgetScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons name="chevron-back-outline" size={35} color="gray" />
      </TouchableOpacity>
      <Text style={styles.textStyle}>Forgot</Text>
      <Text style={styles.textStyle2}>Password?</Text>
      <Input
        w={{
          base: '75%',
          md: '25%',
        }}
        placeholder="Enter your email address"
        style={styles.inputStyle}
      />
      <Text style={styles.subtextStyle}>
        We will send you an email to reset the password
      </Text>
      <TouchableOpacity>
        <Pressable>
          <Text style={styles.sendStyle}>Send Code</Text>
        </Pressable>
      </TouchableOpacity>
      <TouchableOpacity>
        <Button style={styles.arrowButton}>
          <Icon
            as={Ionicons}
            name="arrow-forward-outline"
            size="sm"
            color="white"
          />
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
  },
  textStyle: {
    color: '#F8774A',
    fontWeight: 'bold',
    fontSize: 30,
    marginHorizontal: 30,
    marginTop: 20,
  },
  textStyle2: {
    color: '#F8774A',
    fontWeight: 'bold',
    fontSize: 30,
    marginHorizontal: 30,
  },
  subtextStyle: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
    marginHorizontal: 35,
  },
  arrowButton: {
    backgroundColor: '#F8774A',
    width: 40,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 40,
  },
  inputStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 20,
  },
  sendStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A9A9A9',
    marginTop: 40,
    marginLeft: 30,
  },
  backButton: {
    marginHorizontal: 20,
    marginTop: 15,
  },
});

export default ForgetScreen;
