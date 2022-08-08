import {
  Badge,
  Button,
  HStack,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
} from 'native-base';
import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import IncDecButton from '../../../components/IncDecButton';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import Ingredient from '../../../models/ingredient';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addShoppingItem } from '../../../store/slices/shoppingListSlice';
import { selectUser } from '../../../store/slices/authSlice';

interface IProps {
  item: Ingredient;
  onSave: (item: Ingredient) => Promise<void>;
  onDelete: (itemId: string) => Promise<void>;
}

const IngredientItem: FC<IProps> = (props) => {
  const { item } = props;
  const [quantity, setQuantity] = React.useState(item.quantity);
  const [editing, setEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isAddingToShoppingList, setIsAddingToShoppingList] =
    React.useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const saveChanges = async () => {
    if (editing && quantity !== item.quantity) {
      setIsUpdating(true);
      await props.onSave({ ...item, quantity });
      setIsUpdating(false);
    }
    setEditing(!editing);
  };

  const deleteItem = async () => {
    setIsDeleting(true);
    await props.onDelete(item.id);
  };

  const addToShoppingList = async () => {
    setIsAddingToShoppingList(true);
    await dispatch(addShoppingItem({ userId: user.id, item }));
    setIsAddingToShoppingList(false);
  };

  return (
    <View style={styles.ingredientItem}>
      <HStack space={2} alignItems="center">
        <Image style={styles.image} source={{ uri: item.imgUrl }} />
        <VStack space={1}>
          <Text style={GlobalStyleSheet.title3}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
          {/* <Text isTruncated w={'lg'}>
            Last Update: {item.date}
          </Text> */}
          <HStack>
            {!editing ? (
              <HStack>
                <Text style={{ fontSize: 14, color: 'gray' }}>
                  {quantity} Pcs
                </Text>
              </HStack>
            ) : (
              <IncDecButton
                value={quantity}
                increment={() => setQuantity(quantity + 1)}
                decrement={() => setQuantity(quantity !== 1 ? quantity - 1 : 1)}
              />
            )}
          </HStack>
        </VStack>
        <Spacer />
        <View style={{ paddingHorizontal: 5 }}></View>
        <HStack alignItems="center" space={7}>
          {isUpdating ? (
            <Spinner color={GlobalStyleSheet.themeColor.backgroundColor} />
          ) : (
            <TouchableOpacity onPress={saveChanges}>
              <AntDesign
                name={editing ? 'check' : 'edit'}
                size={20}
                color={GlobalStyleSheet.themeColor.backgroundColor}
              />
            </TouchableOpacity>
          )}
          <VStack>
            {isAddingToShoppingList ? (
              <Spinner color={GlobalStyleSheet.themeColor.backgroundColor} />
            ) : (
              <TouchableOpacity onPress={addToShoppingList}>
                <View style={styles.shoppingIcon}>
                  <Text style={styles.badgeContent}>+</Text>
                  <Feather name="shopping-bag" size={20} color="black" />
                </View>
              </TouchableOpacity>
            )}
          </VStack>
          <TouchableOpacity onPress={deleteItem}>
            {isDeleting ? (
              <Spinner color={GlobalStyleSheet.themeColor.backgroundColor} />
            ) : (
              <AntDesign name="delete" size={20} color={'red'} />
            )}
          </TouchableOpacity>
        </HStack>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientItem: {
    width: '100%',
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: 'contain',
  },

  buttonStyle: {
    borderRadius: 20,
    width: 70,
  },

  stackStyle: {
    marginBottom: 2.5,
    marginTop: 1.5,
    flexDirection: 'column',
    marginHorizontal: 'auto',
  },

  buttonText: {
    color: GlobalStyleSheet.themeColor.backgroundColor,
    marginHorizontal: 10,
  },

  hStackStyle: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'transparent',
  },

  shoppingIcon: {
    position: 'relative',
  },

  badge: {
    // ...tailwind('absolute rounded-full bg-transparent self-end z-10'),
    position: 'absolute',
    top: 0,
    left: 0,
    // marginBottom: -15,
    // marginRight: -15,
  },
  badgeContent: {
    position: 'absolute',
    top: -7,
    right: -5,
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyleSheet.themeColor.backgroundColor,
  },
});

export default IngredientItem;
