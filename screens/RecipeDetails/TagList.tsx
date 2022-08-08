import React from 'react';
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from 'native-base';
import { View } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { forHorizontalIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import images from '../../utils/assets';
import { Image } from 'react-native';
export const Example = ({ tags }) => {
  const renderItem = ({ item, index }) => (
    <Text
      marginBottom="5px"
      marginLeft="20px"
      _dark={{
        color: 'warmGray.50',
      }}
      color="coolGray.800"
    >
      {item}
    </Text>
  );
  return (
    <FlatList
      data={tags}
      horizontal
      scrollEnabled={false}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const Example2 = ({ tags }) => {
  return (
    <HStack
      justifyContent="center"
      mx={{
        base: 'auto',
        md: '0',
      }}
      space={0}
    >
      {tags.includes('Vegan') && (
        <View
          style={{ backgroundColor: 'white', borderRadius: 30, padding: 5 }}
        >
          <Image
            style={{ resizeMode: 'contain', height: 30, width: 30 }}
            source={images.vegan}
          ></Image>
        </View>
      )}
      {tags.includes('Vegeterian') && (
        <View
          style={{ backgroundColor: 'white', borderRadius: 30, padding: 5 }}
        >
          <Image
            style={{ resizeMode: 'contain', height: 30, width: 30 }}
            source={images.vegeterian}
          ></Image>
        </View>
      )}
      {tags.includes('Dairy Free') && (
        <View
          style={{ backgroundColor: 'white', borderRadius: 30, padding: 5 }}
        >
          <Image
            style={{ resizeMode: 'contain', height: 30, width: 30 }}
            source={images.dairyfree}
          ></Image>
        </View>
      )}
      {tags.includes('Gluten Free') && (
        <View
          style={{ backgroundColor: 'white', borderRadius: 30, padding: 5 }}
        >
          <Image
            style={{ resizeMode: 'contain', height: 30, width: 30 }}
            source={images.glutenfree}
          ></Image>
        </View>
      )}
      {tags.includes('Keto') && (
        <View
          style={{ backgroundColor: 'white', borderRadius: 30, padding: 5 }}
        >
          <Image
            style={{ resizeMode: 'contain', height: 30, width: 30 }}
            source={images.keto}
          ></Image>
        </View>
      )}
      {tags.includes('Lactose') && (
        <View
          style={{ backgroundColor: 'white', borderRadius: 30, padding: 5 }}
        >
          <Image
            style={{ resizeMode: 'contain', height: 30, width: 30 }}
            source={images.lactose}
          ></Image>
        </View>
      )}
    </HStack>
  );
};

export default function TagList({ tags }) {
  return (
    <NativeBaseProvider>
      <Example2 tags={tags} />
    </NativeBaseProvider>
  );
}
