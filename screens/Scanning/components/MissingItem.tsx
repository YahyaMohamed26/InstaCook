import { Feather, AntDesign } from '@expo/vector-icons';
import { Badge, HStack, Image, Spacer, Text, VStack } from 'native-base';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import Ingredient from '../../../models/ingredient';
import images from '../../../utils/assets';

interface IProps {
  item: Ingredient;
}

const MissingItem: FC<IProps> = (props) => {
  const { item } = props;
  const _buildAddToShopBtn = () => {
    return (
      <View style={{ marginRight: 5 }}>
        <TouchableOpacity onPress={() => {}} style={{ padding: 5 }}>
          <VStack>
            <Badge style={styles.badge}>
              <Text style={styles.badgeContent}>+</Text>
            </Badge>
            <View>
              <Feather name="shopping-bag" size={24} color="black" />
            </View>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ padding: 5 }}>
          <VStack>
            <View>
              <AntDesign name="delete" size={24} color="black" />
            </View>
          </VStack>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <HStack style={styles.container} alignItems="center">
      <Image source={images.food} alt="sdfj" style={styles.image} />
      <View style={styles.details}>
        <Text style={GlobalStyleSheet.title3}>{item.name}</Text>
        <Text style={GlobalStyleSheet.subtitle2}>Last Seen: 2021-12-12</Text>
      </View>
      <Spacer />
      {_buildAddToShopBtn()}
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    ...tailwind('flex mb-2 mx-4 py-2'),
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
  },
  image: {
    width: 100,
    maxHeight: '100%',
    ...tailwind('mr-2 rounded-lg'),
    borderRadius: 30,
    backgroundColor: 'blue',
  },
  details: {
    ...tailwind('flex flex-col justify-center'),
  },

  badge: {
    ...tailwind('rounded-full bg-transparent self-end z-10'),
    marginBottom: -15,
    marginRight: -15,
  },
  badgeContent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyleSheet.themeColor.backgroundColor,
  },
});

export default MissingItem;
