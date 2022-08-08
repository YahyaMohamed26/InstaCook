import { FlatList, NativeBaseProvider, StatusBar } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import { dummyRequests } from '../../../models/ingReq';
import IngRequest from './IngRequest';

const IngredientRequests = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <View style={styles.container}>
          <FlatList
            data={dummyRequests}
            renderItem={({ item }) => <IngRequest ingRequest={item} />}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          ></FlatList>
        </View>
      </NativeBaseProvider>
      <StatusBar
        backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});

export default IngredientRequests;
