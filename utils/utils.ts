import AsyncStorage from '@react-native-async-storage/async-storage';

export const isFirstLoggin = async (userId: string) => {
  try {
    const value = await AsyncStorage.getItem(userId);
    console.log('value ===> ', value);
    if (value === null) {
      await AsyncStorage.setItem(userId, userId);
      return true;
    }
    return false;
  } catch (e) {
    // saving error
  }
};
