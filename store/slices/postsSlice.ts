import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PublishedRecipe } from '../../models/publishedRecipe';
import Recipe, { dummyRecipes } from '../../models/recipe';
import { RecipePost } from '../../models/recipePost';
import db from '../../services/db/db';
import { RootState } from '../store';

export interface PostsState {
  // TODO: Change type to Post[]
  myPosts: Recipe[];
  savedRecipes: Recipe[];
  allPosts: RecipePost[];
}

const initialState: PostsState = {
  myPosts: [],
  savedRecipes: [],
  allPosts: [],
};

export const publishPost = createAsyncThunk(
  'posts/add',
  async (post: PublishedRecipe) => {
    const publishedPost = await db.publishPost(post);
    return publishedPost;
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (post: PublishedRecipe) => {
    const deletedPost = await db.publishPost(post);
    return deletedPost;
  }
);

export const saveRecipeItem = createAsyncThunk(
  'savedRecipes/save',
  async (payload: Record<string, unknown>) => {
    const savedRecipe = await db.saveRecipe(
      payload.userId as string,
      payload.item as Recipe
    );
    return savedRecipe;
  }
);

export const unsaveRecipe = createAsyncThunk(
  'savedRecipes/unsave',
  async (payload: Record<string, unknown>) => {
    const savedRecipe = await db.unsaveRecipe(
      payload.userId as string,
      payload.item as Recipe
    );
    return savedRecipe;
  }
);

export const fetchSavedRecipes = createAsyncThunk(
  'savedRecipes/fetch',
  async (userId: string) => {
    const savedRecipes = await db.getSavedRecipes(userId);
    console.log('saved ===> ', savedRecipes);
    return savedRecipes;
  }
);
export const fetchPublishedRecipes = createAsyncThunk(
  'publishedRecipes/fetch',
  async (userId: string) => {
    const publishedRecipes = await db.getPublishedRecipes(userId);
    console.log('published ===> ', publishedRecipes);
    return publishedRecipes;
  }
);
export const fetchAllPublishedRecipes = createAsyncThunk(
  'publishedRecipes/fetchAll',
  async (userId: string) => {
    const publishedRecipes = await db.getAllPublishedRecipes();
    console.log('publishedAll ===> ', publishedRecipes);
    return publishedRecipes;
  }
);
// ============================== SLICE ==============================
export const suggestedRecipesSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    saveRecipe: (state, action: PayloadAction<Recipe>) => {
      state.savedRecipes.push(action.payload);
    },
    removeSavedRecipe: (state, action: PayloadAction<Recipe>) => {
      state.savedRecipes.splice(state.savedRecipes.indexOf(action.payload), 1);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(publishPost.fulfilled, (state, action) => {
      state.myPosts.push(action.payload.recipe);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.myPosts.splice(state.myPosts.indexOf(action.payload.recipe), 1);
    });
    builder.addCase(saveRecipeItem.fulfilled, (state, action) => {
      state.savedRecipes.push(action.payload);
    });
    builder.addCase(unsaveRecipe.fulfilled, (state, action) => {
      state.savedRecipes.splice(state.savedRecipes.indexOf(action.payload), 1);
    });
    builder.addCase(fetchSavedRecipes.fulfilled, (state, action) => {
      state.savedRecipes = action.payload;
    });
    builder.addCase(fetchPublishedRecipes.fulfilled, (state, action) => {
      state.myPosts = action.payload;
    });
    builder.addCase(fetchAllPublishedRecipes.fulfilled, (state, action) => {
      state.allPosts = action.payload;
    });
  },
});
// ============================== ACTIONS ==============================
export const { removeSavedRecipe } = suggestedRecipesSlice.actions;
// ============================== GETTERS ==============================
export const selectMyPosts = (state: RootState) => state.posts.myPosts;

export const selectAllPosts = (state: RootState) => state.posts.allPosts;

export const selectSavedRecipes = (state: RootState) =>
  state.posts.savedRecipes;

export default suggestedRecipesSlice.reducer;
