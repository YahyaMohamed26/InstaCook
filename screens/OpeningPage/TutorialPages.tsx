import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import TutorialInfo from '../../constants/TutorialInfo';
import TutorialItem from './TutorialItem';
import images from '../../utils/assets';
import { useFonts } from 'expo-font';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import Constants from 'expo-constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const TutorialPages = ({ navigation }) => {
  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  const viewChange = useRef(({ viewableItems }) => {
    setCurrentViewIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentViewIndex < TutorialInfo.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentViewIndex + 1 });
    } else {
      navigation.navigate('TabBar');
    }
  };

  const size = 128;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const handleSkip = () => {
    navigation.navigate('TabBar');
  };
  /*useEffect(() => {
   if(1)
   {
    navigation.navigate('TabBar');
   }
  });*/

  useEffect(() => {
    animation((currentViewIndex + 1) * (100 / TutorialInfo.length));
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  }, [(currentViewIndex + 1) * (100 / TutorialInfo.length)]);

  let [fontLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontLoaded) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={[styles.container, GlobalStyleSheet.themeColor]}>
      <TouchableOpacity
        onPress={handleSkip}
        style={{ alignSelf: 'flex-end', marginRight: 30, top: 45 }}
      >
        <Text style={{ ...GlobalStyleSheet.title2, color: 'white' }}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.logo}>
        <Image source={images.logo} style={styles.logoStyle}></Image>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text
          style={[styles.appNameText, { fontFamily: 'Pacifico_400Regular' }]}
        >
          InstaCook
        </Text>
      </View>
      <View style={{ flex: 3 }}>
        <FlatList
          data={TutorialInfo}
          renderItem={({ item }) => <TutorialItem item={item} />}
          horizontal
          pagingEnabled
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewChange}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={{ flexDirection: 'row', height: 64, bottom: 100 }}>
        {TutorialInfo.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth }]}
              key={i.toString()}
            ></Animated.View>
          );
        })}
      </View>
      <View style={styles.container2}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={center}>
            <Circle
              stroke="#E6E7E8"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
            ></Circle>
            <Circle
              stroke="#20B2AA"
              ref={progressRef}
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
            ></Circle>
          </G>
        </Svg>

        <TouchableOpacity
          onPress={scrollTo}
          style={styles.button}
          activeOpacity={0.6}
        >
          <AntDesign name="arrowright" size={32} color="white"></AntDesign>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  logoStyle: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
  },
  logo: {
    height: width / 4,
    width: width / 4,
    backgroundColor: 'white',
    borderRadius: width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'white',
    marginTop: 30,
  },
  container2: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 70,
  },

  button: {
    position: 'absolute',
    backgroundColor: '#20B2AA',
    borderRadius: 100,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appNameText: {
    fontSize: 24,
    color: 'white',
  },
});

export default TutorialPages;
