import {
  Button,
  Divider,
  HStack,
  Input,
  NativeBaseProvider,
  Spacer,
  Switch,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'tailwind-rn';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import { testUser } from '../../../models/user';
import { logout } from '../../../services/auth/auth';

const SettingsScreen = () => {
  const [userInfo, setUserInfo] = useState({ ...testUser });

  /**
   * Build input for user info (i.e. name, email, etc.)
   * @param label
   * @param value
   * @param onChange
   * @returns
   */
  const _buildInput = (
    label: string,
    value: string,
    onChange: (e: any) => void
  ) => {
    return (
      <View style={styles.input}>
        <Text style={styles.inputLabel}>{label}</Text>
        <Input
          width={'100%'}
          value={value}
          onChange={onChange}
          borderRadius={7}
          mt={1}
          style={styles.inputText}
        />
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* SETTING OPTIONS */}
          <View>
            <TouchableOpacity onPress={logout}>
              <View style={tailwind('mx-10 mt-5')}>
                <Button bg={GlobalStyleSheet.themeColor.backgroundColor}>
                  <Text style={{ color: 'white' }}>Change Password</Text>
                </Button>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <View style={tailwind('mx-10 mt-3')}>
                <Button bg={GlobalStyleSheet.themeColor.backgroundColor}>
                  <Text style={{ color: 'white' }}>Logout</Text>
                </Button>
              </View>
            </TouchableOpacity>
            <View style={tailwind('mx-10 mt-3')}>
              <Button bg={GlobalStyleSheet.themeColor.backgroundColor}>
                <Text style={{ color: 'white' }}>Delete Account</Text>
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('bg-white flex-1 justify-between px-6 py-2 pb-40'),
  },
  infoContainer: {
    ...tailwind('flex flex-col items-center'),
    paddingHorizontal: '10%',
  },
  input: {
    ...tailwind('mb-4 w-full'),
  },
  inputLabel: {
    ...GlobalStyleSheet.subtitle1,
    color: GlobalStyleSheet.themeColor.backgroundColor,
  },
  inputText: {
    ...GlobalStyleSheet.subtitle2,
  },
});

export default SettingsScreen;
