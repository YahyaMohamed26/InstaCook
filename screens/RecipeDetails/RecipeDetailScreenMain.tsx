import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tailwind from 'tailwind-rn';
import RecipesApi from '../../api/recipesApi';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import Recipe from '../../models/Recipe';
import LoadingRecipeDetails from './LoadingRecipeDetails';
import RecipeTabs from './RecipeTabs';
import TagList from './TagList';
import { FontAwesome } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  saveRecipeItem,
  selectSavedRecipes,
  unsaveRecipe,
} from '../../store/slices/postsSlice';
import { selectUser } from '../../store/slices/authSlice';
import { NativeBaseProvider, Spinner } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RecipeDetailsScreenMain = ({ route, navigation }) => {
  const { recipe, isPublished } = route.params;
  const [liked, setLiked] = React.useState(0);
  const [dislike, setDislike] = React.useState(0);
  const [detailedRecipe, setDetailedRecipe] = React.useState({} as Recipe);
  const savedRecipes = useAppSelector(selectSavedRecipes);
  const [isSaving, setIsSaving] = React.useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [loading, setLoading] = React.useState(true);
  const [url, setUrl] = React.useState('');

  const storage = getStorage();

  useEffect(() => {
    if (!recipe.image.toString().includes('http') && recipe.image != '') {
      getDownloadURL(ref(storage, '/' + recipe.image.toString()))
        .then((url) => {
          // Or inserted into an <img> element
          console.log(url);
          console.log(recipe.image);
          setUrl(url);
        })
        .catch((error) => {
          // Handle any errors
        });
    } else {
      setUrl(recipe.image);
    }
  });

  useEffect(() => {
    console.log(recipe);
    const fetchRecipeDetails = async () => {
      console.log('asdkfljdlksafjklsdfljk', recipe);
      setLoading(true);
      try {
        if (recipe.isPublishedByUser) {
          setDetailedRecipe(recipe);

          console.log('-------------------------------', detailedRecipe);
        } else {
          let result = await RecipesApi.getRecipeDetailsByRecipeId(recipe.id);
          setDetailedRecipe(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

      // try {
      //   let result = await RecipesApi.getRecipeDetailsByRecipeId(recipe.id);
      //   setDetailedRecipe(result);
      //   setLoading(false);
      // } catch (e) {
      //   console.log(e);
      //   console.log('not found');
      //   setLoading(false);

      //   //TODO: get recipe from db
      // }
    };

    fetchRecipeDetails();
  }, []);

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

  const goBack = () => {
    navigation.goBack();
  };

  const isInSavedRecipesList = () => {
    return savedRecipes.some(
      (item) =>
        item.id === detailedRecipe.id || item.title === detailedRecipe.title
    );
  };

  const toggleSave = async () => {
    setIsSaving(true);
    if (isInSavedRecipesList()) {
      await dispatch(unsaveRecipe({ userId: user.id, item: detailedRecipe }));
    } else {
      await dispatch(saveRecipeItem({ userId: user.id, item: detailedRecipe }));
    }
    pressLike();
    setIsSaving(false);
  };

  const LoadedScreen = () => {
    return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <View style={styles.pictureView}>
            <ImageBackground
              style={styles.image}
              source={{
                uri: url,
              }}
            ></ImageBackground>
          </View>
          <View style={styles.backBtnContainer}>
            <TouchableOpacity style={styles.backBtn} onPress={goBack}>
              <Entypo name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height / 6 - height / 12 + 30,
                flex: 1.5,
              }}
            >
              <RecipeTabs
                ingredients={detailedRecipe.ingredients}
                directions={detailedRecipe.directions}
              ></RecipeTabs>
            </View>
          </View>

          <View style={styles.descriptionView}>
            <View style={styles.tagBox2}>
              {/* {<TagList tags={detailedRecipe.tags}></TagList>} */}
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginHorizontal: 10,
              }}
            >
              {detailedRecipe.title}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  marginRight: 10,
                }}
              >
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AntDesign name="clockcircleo" size={12} color="orange" />
                  <Text style={[styles.tagText, { color: 'orange' }]}>
                    {detailedRecipe.time} min
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="flame" size={18} color="orange" />
                  <Text style={[styles.tagText]}>
                    {detailedRecipe.calorieInfo} cal
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.likeButtonsView}>
            {isSaving ? (
              <Spinner color={GlobalStyleSheet.themeColor.backgroundColor} />
            ) : (
              <TouchableOpacity
                style={{ marginHorizontal: 5 }}
                onPress={toggleSave}
              >
                {isInSavedRecipesList() ? (
                  <FontAwesome
                    name="bookmark"
                    size={22}
                    color={GlobalStyleSheet.themeColor.backgroundColor}
                  />
                ) : (
                  <FontAwesome name="bookmark-o" size={22} color="black" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        <StatusBar
          backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
        />
      </NativeBaseProvider>
    );
  };

  // useEffect(() => {
  //   fetchDetails();
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      {!loading ? (
        LoadedScreen()
      ) : (
        <LoadingRecipeDetails></LoadingRecipeDetails>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    flexDirection: 'column',
    alignItems: 'center',
    width: width,
    height: height,
  },
  likeButtonsView: {
    backgroundColor: 'white',
    height: height / 15,
    width: height / 15,
    borderRadius: 30,
    top: height / 3 + 15,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'flex-end',
    position: 'absolute',
    flexDirection: 'row',
  },
  pictureView: {
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    width: width * 1.3,
    height: height / 3,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    overflow: 'hidden',
  },

  topViewBox: {
    flex: 1,
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    height: 150,
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 15,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  tagBox2: {
    flexDirection: 'row',
    marginVertical: 7,
    flex: 2,
    bottom: -height / 3 + height / 3 + height / 12 + 35,
    position: 'absolute',
    alignItems: 'center',
  },
  descriptionView: {
    backgroundColor: 'white',
    height: height / 6,
    width: width / 1.2,
    borderRadius: 30,
    bottom: -height / 3 + height / 3 + height / 12 + 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  infoView: {
    backgroundColor: 'white',
    width: width,
    height: (2.3 * height) / 3,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    top: height / 3 - 20,
  },
  tagBox: {
    flexDirection: 'row',
    marginVertical: 7,
    flex: 2,
  },

  tagText: {
    fontSize: 12,
    marginHorizontal: 8,
    color: 'gray',
  },

  backBtnContainer: {
    ...tailwind(
      'absolute w-full flex flex-row justify-between items-center top-8 px-4'
    ),
  },
  backBtn: {
    ...tailwind('p-2 rounded-full'),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  descriptionTextView: {
    fontSize: 12,
    marginHorizontal: 8,
  },
});

export default RecipeDetailsScreenMain;
