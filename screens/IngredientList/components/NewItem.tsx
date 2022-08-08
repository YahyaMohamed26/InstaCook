import {
  Button,
  Flex,
  HStack,
  Input,
  Spacer,
  Stack,
  VStack,
} from 'native-base';
import React, { FC } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import RecipesApi from '../../../api/recipesApi';
import IncDecButton from '../../../components/IncDecButton';
import Ingredient from '../../../models/ingredient';

interface IProps {
  onItemAdded: (newItem: Ingredient) => void;
}

const NewItem: FC<IProps> = (props) => {
  const [quantity, setQuantity] = React.useState(1);
  const [name, setName] = React.useState('');

  const onAdd = () => {
    const imgUrl = RecipesApi.getIngredientUrl(
      name.toLowerCase()[name.length - 1] === 's'
        ? name.substring(0, name.length - 1).toLowerCase()
        : name.toLowerCase()
    );
    console.log(imgUrl);
    const newItem: Ingredient = {
      id: Math.random() * 1000 + 10 + '',
      date: '2021-12-12',
      name,
      quantity: quantity,
      imgUrl: imgUrl,
    };

    props.onItemAdded(newItem);

    setQuantity(0);
    setName('');
  };

  return (
    <View style={styles.ingredientItem}>
      <HStack space={2} alignItems="center">
        <VStack space={2} w="60%">
          <Input
            value={name}
            h={8}
            autoFocus={true}
            type="string"
            placeholder="Ingredient Name"
            onChangeText={setName}
          />
          <HStack alignItems="center" style={styles.hstackStyle}>
            <Text>Quantity </Text>
            <IncDecButton
              value={quantity}
              increment={() => setQuantity(quantity + 1)}
              decrement={() => setQuantity(quantity !== 1 ? quantity - 1 : 1)}
            />
          </HStack>
        </VStack>
        <Spacer />
        <Stack style={styles.stackStyle} space={1}>
          <Button
            onPress={onAdd}
            disabled={name.trim() === ''}
            size="sm"
            variant="outline"
            colorScheme={name.trim() === '' ? 'gray' : 'orange'}
            style={
              name.trim() === '' ? styles.buttonStyle : styles.buttonStyleActive
            }
          >
            Add
          </Button>
        </Stack>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientItem: {
    width: '100%',
    borderColor: '#F8774A',
    borderBottomWidth: 2,
  },
  buttonStyle: {
    borderRadius: 20,
    width: 70,
    borderWidth: 2,
  },
  buttonStyleActive: {
    borderRadius: 20,
    width: 70,
    borderWidth: 2,
    borderColor: '#F8774A',
  },
  hstackStyle: {
    marginBottom: 13,
  },
  stackStyle: {
    marginBottom: 2.5,
    marginTop: 1.5,
    flexDirection: 'column',
    marginHorizontal: 'auto',
  },
});

export default NewItem;
