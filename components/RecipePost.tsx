import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'native-base';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import GlobalStyleSheet from '../constants/GlobalStyleSheet';
import Recipe from '../models/recipe';
import images from '../utils/assets';
import Percentage from './Percentage';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

interface Props {
  recipe: Recipe;
}

/**
 * A component to render a recipe post.
 * @param props
 * @returns
 */
const RecipePost: FC<Props> = (props) => {
  const navigation = useNavigation();
  const openRecipeDetails = () => {
    navigation.navigate('Publish Recipe Details', {
      recipe: props.recipe,
      isPublished: false,
    });
  };
  const [url, setUrl] = React.useState('');

  const storage = getStorage();
  var randomColor = require('randomcolor'); // import the script

  React.useEffect(() => {
    if (
      !props.recipe.image?.toString().includes('http') &&
      props.recipe.image != ''
    ) {
      getDownloadURL(ref(storage, '/' + props.recipe.image?.toString()))
        .then((url) => {
          // Or inserted into an <img> element
          console.log(url);
          console.log(props.recipe.image);
          setUrl(url);
        })
        .catch((error) => {
          // Handle any errors
        });
      console.log('normal');
    } else {
      setUrl(props.recipe.image);
      console.log('http');
    }
  });

  return (
    <TouchableOpacity onPress={openRecipeDetails}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri:
              props.recipe.image === ''
                ? 'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'
                : url,
          }}
        />
        <View style={styles.info}>
          <Text numberOfLines={1} style={{ flex: 1 }}>
            {props.recipe.title}
          </Text>
          {/* <View style={{ flex: 1 }}>
            <Percentage
              percentage={60}
              percentageLabel="Likes"
              otherLabel="Dislikes"
            />
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
  },
  image: {
    ...tailwind('justify-center items-center'),
    width: '100%',
    height: 100,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flex: 1,
    resizeMode: 'cover',
  },
  info: {
    ...tailwind('flex-row justify-between px-2 py-2'),
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default RecipePost;
