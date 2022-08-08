import { Spinner } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import RecipePost from '../../../components/RecipePost';
import RecipesGrid from '../../../components/RecipesGrid';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../store/slices/authSlice';
import {
  fetchSavedRecipes,
  selectSavedRecipes,
} from '../../../store/slices/postsSlice';

const SavedRecipes = () => {
  const data = useAppSelector(selectSavedRecipes);
  const [isFetchingRecipes, setIsFetchingRecipes] = React.useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const getRecipes = async () => {
      setIsFetchingRecipes(true);
      await dispatch(fetchSavedRecipes(user.id));
      setIsFetchingRecipes(false);
    };

    getRecipes();
  }, []);

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
export default SavedRecipes;
