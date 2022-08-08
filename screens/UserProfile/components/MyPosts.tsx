import { Spinner } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import RecipePost from '../../../components/RecipePost';
import RecipesGrid from '../../../components/RecipesGrid';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import Recipe from '../../../models/recipe';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../store/slices/authSlice';
import {
  fetchPublishedRecipes,
  selectMyPosts,
} from '../../../store/slices/postsSlice';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const MyPosts = () => {
  const data: Recipe[] = useAppSelector(selectMyPosts).map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      calorieInfo: item.calorieInfo,
      image: item.image,
      tags: item.tags,
      ingredients: item.ingredients,
      directions: item.directions,
      time: item.time,
      likes: item.likes,
      // missedIngredientCount: item.missedIngredientCount,

      missedIngredientCount: 2,
      isPublishedByUser: item.isPublishedByUser,
    };
  });
  const [isFetchingRecipes, setIsFetchingRecipes] = React.useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const storage = getStorage();
  const [url, setUrl] = React.useState('');

  useEffect(() => {
    const getRecipes = async () => {
      setIsFetchingRecipes(true);
      await dispatch(fetchPublishedRecipes(user.id));
      setIsFetchingRecipes(false);
    };

    getRecipes();
  }, []);

  console.log('HELOOOOOO DATTTTAAAA', data);

  return (
    <View style={styles.posts}>
      {isFetchingRecipes ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner color={GlobalStyleSheet.themeColor.backgroundColor} />
        </View>
      ) : (
        <RecipesGrid
          data={data}
          numOfCols={2}
          itemRenderer={(item) => <RecipePost recipe={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  posts: {
    width: '100%',
    height: '100%',
  },
});
export default MyPosts;
