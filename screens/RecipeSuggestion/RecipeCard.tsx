import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import Recipe from '../../models/recipe';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { HStack, Skeleton, Spinner, VStack } from 'native-base';
import {
  saveRecipeItem,
  selectSavedRecipes,
  unsaveRecipe,
} from '../../store/slices/postsSlice';
import { selectUser } from '../../store/slices/authSlice';

interface Props {
  recipe: Recipe;
  onPressFunction: (event: GestureResponderEvent) => void;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RecipeCard = (props: Props) => {
  const { recipe } = props;
  const [liked, setLiked] = React.useState(0);
  const [dislike, setDislike] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const savedRecipes = useAppSelector(selectSavedRecipes);

  const pressLike = () => {
    if (liked === 0) {
      setLiked(1);
      setDislike(0);
    } else if (liked === 1) {
      setLiked(0);
    }
  };
  const pressDislike = () => {
    if (dislike === 0) {
      setDislike(1);
      setLiked(0);
    } else if (dislike === 1) {
      setDislike(0);
    }
  };

  setTimeout(() => {
    setIsLoaded(true);
  }, 2000);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const isInSavedRecipesList = () => {
    return savedRecipes.some((item) => item.id === recipe.id);
  };

  const saveRecipe = async () => {
    setIsSaving(true);
    console.log('issaved ====> ', isInSavedRecipesList());
    if (isInSavedRecipesList()) {
      await dispatch(unsaveRecipe({ userId: user.id, item: props.recipe }));
    } else {
      await dispatch(saveRecipeItem({ userId: user.id, item: props.recipe }));
    }
    pressLike();
    setIsSaving(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPressFunction}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: recipe.image }}></Image>
      </View>
      <View style={styles.recipeDetailsContainer}>
        <View style={styles.recipeDetailTop}>
          <View style={styles.reciepDetailLeftSide}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
              {props.recipe.title}
            </Text>
            <Text numberOfLines={3} style={styles.description}>
              {props.recipe.description
                .split('<b>')
                .join('')
                .split('</b>')
                .join('')}
            </Text>
          </View>
          {/* <View style={styles.reciepDetailRightSide}> */}
          <VStack alignItems={'center'} flex={0.5} pr={2} space={4} pt={2}>
            <HStack alignItems={'center'}>
              <AntDesign name="clockcircleo" size={16} color="orange" />
              <Text style={{ color: 'gray' }}>{props.recipe.time} min</Text>
            </HStack>
            <View>
              <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
                {isSaving ? (
                  <Spinner
                    color={GlobalStyleSheet.themeColor.backgroundColor}
                    size={14}
                  />
                ) : isInSavedRecipesList() ? (
                  <FontAwesome
                    name="bookmark"
                    size={26}
                    color={GlobalStyleSheet.themeColor.backgroundColor}
                  />
                ) : (
                  <FontAwesome name="bookmark-o" size={26} color="black" />
                )}
              </TouchableOpacity>
            </View>
          </VStack>
          {/* </View> */}
        </View>

        {/* <View style={styles.recipeDetailBottom}>
          <Text style={styles.missingItemInformation}>
            {props.recipe.missedIngredientCount} missing items!
          </Text>

          <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
            {isSaving ? (
              <Spinner
                color={GlobalStyleSheet.themeColor.backgroundColor}
                size={14}
              />
            ) : isInSavedRecipesList() ? (
              <FontAwesome
                name="bookmark"
                size={26}
                color={GlobalStyleSheet.themeColor.backgroundColor}
              />
            ) : (
              <FontAwesome name="bookmark-o" size={26} color="black" />
            )}
          </TouchableOpacity>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: '95%',
    height: height / 3.5,
    elevation: 10,
    shadowColor: 'black',
    marginVertical: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  imageContainer: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    overflow: 'hidden',
  },
  recipeDetailTop: {
    backgroundColor: 'white',
    marginBottom: 5,
    width: width - 20,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
  },
  recipeDetailBottom: {
    backgroundColor: 'white',
    // flex: 0.5,
    width: width - 20,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: 'gray',
  },

  recipeDetailsContainer: {
    backgroundColor: 'white',
    // flex: 0.8,
    width: width - 20,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'column',
  },
  reciepDetailLeftSide: {
    flex: 2,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    width: width - 20,
    resizeMode: 'cover',
  },
  image2: {
    flex: 1,
    width: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    left: 20,
    top: 4,
    color: GlobalStyleSheet.globalTitleColor.color,
    width: width / 1.6,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    left: 20,
    width: width / 1.7,
    // top: 8,
    color: GlobalStyleSheet.globalDescriptionColor.color,
  },
  likeDislikeRatioLine: {
    height: 2,
    width: width / 3,
    backgroundColor: 'black',
    top: 10,
    alignSelf: 'center',
    right: 5,
  },
  missingItemInformation: {
    color: 'red',
    fontSize: 12,
    left: 25,
    flex: 1,
  },
  saveButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dislikeButton: {
    height: 30,
    width: 30,
    marginRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RecipeCard;
