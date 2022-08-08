import { AntDesign } from '@expo/vector-icons';
import { HStack, Spacer, Spinner, Text, VStack } from 'native-base';
import React, { FC, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import IncDecButton from '../../../components/IncDecButton';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import Ingredient from '../../../models/ingredient';

interface IProps {
  item: Ingredient;
  onDiscard: (item: Ingredient) => void;
  onConfirm: (item: Ingredient) => Promise<void>;
}

const NewItem: FC<IProps> = (props) => {
  const { item } = props;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Restrict quantity to at least 1
  const _updateQuantity = (value: number) =>
    setQuantity(quantity + value > 0 ? quantity + value : quantity + 0);

  const _buildIncDecBtn = () => {
    return (
      <IncDecButton
        value={quantity}
        increment={() => _updateQuantity(1)}
        decrement={() => _updateQuantity(-1)}
        containerStyles={{ padding: 3 }}
      />
    );
  };

  const handleOnConfirm = async (item) => {
    setLoading(true);
    await props.onConfirm(item);
    setLoading(false);
  };

  return (
    <HStack style={styles.container} alignItems="center">
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
      <VStack space={3}>
        <Text style={GlobalStyleSheet.title3}>{item.name}</Text>
        {/* {_buildIncDecBtn()} */}
        {/* <Text style={GlobalStyleSheet.subtitle2}>Quantity: {quantity}</Text> */}
      </VStack>
      <Spacer />
      {loading ? (
        <Spinner color={GlobalStyleSheet.themeColor.backgroundColor} />
      ) : (
        <TouchableOpacity onPress={() => handleOnConfirm(item)}>
          <AntDesign
            name="check"
            size={23}
            color={GlobalStyleSheet.themeColor.backgroundColor}
          />
        </TouchableOpacity>
      )}
      <View style={{ marginHorizontal: 10 }}></View>
      <TouchableOpacity onPress={() => props.onDiscard(item)}>
        <AntDesign name="close" size={23} />
      </TouchableOpacity>
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
    height: '100%',
    ...tailwind('mr-2 rounded-lg'),
    borderRadius: 30,
    backgroundColor: 'blue',
  },
  details: {
    ...tailwind('flex flex-col justify-center'),
  },
});

export default NewItem;
