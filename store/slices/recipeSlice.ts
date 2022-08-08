import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import RecipesApi from '../../api/recipesApi';
import { defaultFilters, UserFilters } from '../../models/filter';
import Recipe from '../../models/recipe';
import db from '../../services/db/db';
import { RootState } from '../store';

export interface RecipesState {
  suggestedRecipes: Recipe[];
  filters: UserFilters;
}

const initialState: RecipesState = {
  suggestedRecipes: [],
  filters: defaultFilters,
};

export const setFilters = createAsyncThunk(
  'filters/set',
  async (payload: Record<string, unknown>) => {
    const filters = await db.setFilters(
      payload.userId as string,
      payload.filters as UserFilters
    );
    return filters;
  }
);

export const fetchFilters = createAsyncThunk(
  'filters/fetch',
  async (userId: string) => {
    const filters = await db.getFilters(userId);
    return filters;
  }
);

export interface RecipeSuggestionProps {
  ingredientNames: string[];
  filters: UserFilters;
  recipeCount: number;
}

export const fetchRecipeSuggestions = createAsyncThunk(
  'suggestions/get',
  async (props: RecipeSuggestionProps) => {
    const ingredientsWithoutDiscarededInFilters = props.ingredientNames.filter(
      (ingredient) => !props.filters.ingredientsToDiscard.includes(ingredient)
    );
    try {
      const suggestions = await RecipesApi.getRecipesByIngredients(
        ingredientsWithoutDiscarededInFilters,
        props.recipeCount
      );

      console.log(
        '================ ',
        props.filters.dietryRestrictions,
        '================'
      );
      if (props.filters.dietryRestrictions.length === 0) return suggestions;

      const dietsFiltersAppliedSuggestions = suggestions.filter(
        (suggestion) => {
          return suggestion.diets.some((diet) => {
            return props.filters.dietryRestrictions.some((filter) => {
              return diet.toLowerCase().includes(filter.toLowerCase());
            });
          });
        }
      );
      return dietsFiltersAppliedSuggestions;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);
// ============================== SLICE ==============================
export const recipesSlice = createSlice({
  name: 'suggestedRecipes',
  initialState,
  reducers: {
    // ============================== RECIPE REDUCERS ==============================
    addNewRecipe: (state, action: PayloadAction<Recipe>) => {
      state.suggestedRecipes.push(action.payload);
    },
    removeRecipe: (state, action: PayloadAction<Recipe>) => {
      state.suggestedRecipes.splice(
        state.suggestedRecipes.indexOf(action.payload),
        1
      );
    },
    /**
     * Updates the suggested recipes with the new recipes
     * usually used to update the suggested recipes after a filter or
     * when user ingredient list is updated.
     * @param state the current state
     * @param action the action that contains the new recipes
     */
    setSuggestedRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.suggestedRecipes = action.payload;
    },

    setUserFilters: (state, action: PayloadAction<UserFilters>) => {
      state.filters = action.payload;
    },

    // ============================== FILTER REDUCERS ==============================
  },

  extraReducers: (builder) => {
    builder.addCase(setFilters.fulfilled, (state, action) => {
      state.filters = action.payload;
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.filters = action.payload;
    });
    builder.addCase(fetchRecipeSuggestions.fulfilled, (state, action) => {
      state.suggestedRecipes = action.payload;
    });
  },
});
// ============================== ACTIONS ==============================
export const {
  addNewRecipe,
  removeRecipe,
  setSuggestedRecipes,
  setUserFilters,
} = recipesSlice.actions;
// ============================== GETTERS ==============================
export const selectSuggestedRecipes = (state: RootState) =>
  state.recipes.suggestedRecipes;

export const selectFilters = (state: RootState) => state.recipes.filters;

export default recipesSlice.reducer;
