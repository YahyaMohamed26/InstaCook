import {
  Button,
  HStack,
  Input,
  Spacer,
  Spinner,
  Stack,
  VStack,
} from 'native-base';
import React, { FC, useCallback, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ingredient from '../../../models/ingredient';
import IncDecButton from '../../../components/IncDecButton';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import Feather from '@expo/vector-icons/build/Feather';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  removeShoppingItem,
  updateShoppingItem,
} from '../../../store/slices/shoppingListSlice';
import { selectUser } from '../../../store/slices/authSlice';
import images from '../../../utils/assets';

interface IProps {
  item: Ingredient;
}

const GETIR_URL = 'https://getir.com';

const ShoppingItem: FC<IProps> = (props) => {
  const [item, setItem] = useState({ ...props.item });
  const [canRequest, setCanRequest] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleRequest = (e) => {
    if (canRequest) setCanRequest(false);
  };

  const toggleIsEditing = async () => {
    if (isEditing && item.quantity !== props.item.quantity) {
      await updateItem();
    }
    setIsEditing(!isEditing);
  };

  const deleteItem = async () => {
    setIsDeleting(true);
    await dispatch(
      removeShoppingItem({ userId: user.id, itemId: props.item.id })
    );
  };

  const updateItem = async () => {
    setIsUpdating(true);
    await dispatch(updateShoppingItem({ userId: user.id, item }));
    setIsUpdating(false);
  };

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const OpenURLButton = (url) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
    }, [url]);
  };

  return (
    <View style={styles.ingredientItem}>
      <HStack space={2} alignItems="center">
        <Image style={styles.image} source={{ uri: item.imgUrl }} />
        <VStack space={2}>
          <Text style={GlobalStyleSheet.title3}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>

          {!isEditing && (
            <Text style={GlobalStyleSheet.subtitle2}>
              {item.quantity + ' Pcs'}
            </Text>
          )}
          {isEditing && (
            <HStack alignItems="center">
              <IncDecButton
                value={item.quantity}
                increment={() =>
                  setItem({ ...item, quantity: item.quantity + 1 })
                }
                decrement={() =>
                  setItem({
                    ...item,
                    quantity: item.quantity !== 1 ? item.quantity - 1 : 1,
                  })
                }
              />
              <Text> Pcs</Text>
            </HStack>
          )}
        </VStack>
        <Spacer />

        {isUpdating ? (
          <Spinner
            color={GlobalStyleSheet.themeColor.backgroundColor}
            size={18}
          />
        ) : (
          <TouchableOpacity onPress={toggleIsEditing}>
            <AntDesign
              name={isEditing ? 'check' : 'edit'}
              size={20}
              color={GlobalStyleSheet.themeColor.backgroundColor}
            />
          </TouchableOpacity>
        )}
        <View style={{ paddingHorizontal: 2 }}></View>
        <TouchableOpacity onPress={() => openLink(GETIR_URL)}>
          <Image source={images.getir} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>

        <View style={{ paddingHorizontal: 2 }}></View>
        {isDeleting ? (
          <Spinner color={GlobalStyleSheet.themeColor.backgroundColor} />
        ) : (
          <TouchableOpacity onPress={deleteItem}>
            <AntDesign name="delete" size={20} color={'red'} />
          </TouchableOpacity>
        )}
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientItem: {
    // height: 100,
    width: '100%',
    // backgroundColor: 'red',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
    resizeMode: 'contain',
  },

  buttonStyle: {
    borderRadius: 20,
    width: 70,
    borderWidth: 2,
  },

  stackStyle: {
    // marginBottom: 2.5,
    // marginTop: 1.5,
    // flexDirection: 'column',
    // marginHorizontal: 'auto',
  },
});

export default ShoppingItem;
