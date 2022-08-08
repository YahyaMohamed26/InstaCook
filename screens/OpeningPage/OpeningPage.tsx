import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import images from '../../utils/assets';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const OpeningPage = () => {
  return (
    <View style={[styles.container, GlobalStyleSheet.themeColor]}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          source={images.openingpagebackground}
        >
          <View style={styles.logo}>
            <Image source={images.logo} style={styles.logoStyle}></Image>
            <Text
              style={{ fontSize: 40, fontStyle: 'italic', fontWeight: 'bold' }}
            >
              InstaCook
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  imageContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: width / 1.5,
    width: width / 1.5,
    backgroundColor: 'red',
    borderRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OpeningPage;
