import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import ingredientsListSlice from './slices/IngredientsListSlice';
import postsSlice from './slices/postsSlice';
import recipeSlice from './slices/recipeSlice';
import sharedSlice from './slices/sharedSlice';
import shoppingListSlice from './slices/shoppingListSlice';

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth: authSlice,
    recipes: recipeSlice,
    ingredients: ingredientsListSlice,
    shoppingList: shoppingListSlice,
    posts: postsSlice,
    shared: sharedSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
