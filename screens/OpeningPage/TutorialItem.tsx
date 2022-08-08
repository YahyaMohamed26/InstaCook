import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const TutorialItem = ({ item }) => {
  return (
    <NativeBaseProvider>
      <View style={[styles.container, GlobalStyleSheet.themeColor]}>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Image
          source={item.image}
          style={[
            styles.image,
            { width: width / 1.7, height: height / 3, resizeMode: 'contain' },
          ]}
        ></Image>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    marginTop: Dimensions.get('window').height / 20,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  description: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 0,
    textAlign: 'center',
    color: 'white',
    width: width,
  },
});

export default TutorialItem;
