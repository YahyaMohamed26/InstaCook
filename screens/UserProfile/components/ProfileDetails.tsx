import {
  Avatar,
  Button,
  Input,
  NativeBaseProvider,
  Spinner,
} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'tailwind-rn';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import db from '../../../services/db/db';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUser, setUser } from '../../../store/slices/authSlice';

const ProfileDetails = () => {
  const user = useAppSelector(selectUser);
  const [userInfo, setUserInfo] = useState(user);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useAppDispatch();

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

  const getUserInitials = () => {
    if (!user.name || !user.name.length) return 'N/A';
    const name = user.name.split(' ');
    if (name.length === 1) return name[0].substring(0, 1).toUpperCase();
    return (
      name[0].substring(0, 1).toUpperCase() +
      name[1].substring(0, 1).toUpperCase()
    );
  };

  const saveChanges = async () => {
    setIsSaving(true);
    await db.upsertUser(userInfo);
    dispatch(setUser(userInfo));
    setIsSaving(false);
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* PROFILE PICTURE*/}
          <View style={styles.infoContainer}>
            <Avatar source={{ uri: user.picSrc }} size={130} mb={4}>
              <Text
                style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}
              >
                {getUserInitials()}
              </Text>
            </Avatar>
            <Button
              variant="outline"
              borderColor={'black'}
              color={'black'}
              borderWidth={1}
              mb={4}
            >
              <Text>Change Profile Picture</Text>
            </Button>
            {/* USER INFO */}
            {_buildInput('Name', userInfo.name, (e) =>
              setUserInfo({ ...userInfo, name: e.nativeEvent.text })
            )}

            {/* {_buildInput('Phone Number', userInfo.phoneNumber, (e) =>
              setUserInfo({ ...userInfo, phoneNumber: e.nativeEvent.text })
            )} */}

            {/* {_buildInput('Address', userInfo.address, (e) =>
              setUserInfo({ ...userInfo, address: e.nativeEvent.text })
            )} */}
            <Button
              bgColor={GlobalStyleSheet.themeColor.backgroundColor}
              py={3}
              w={'100%'}
              mt={4}
              onPress={saveChanges}
            >
              {isSaving ? (
                <Spinner color="white" />
              ) : (
                <Text style={{ color: 'white' }}>Save Changes</Text>
              )}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('bg-white flex-1 px-6 py-2'),
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

export default ProfileDetails;
