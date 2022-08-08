import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Ingredient, { dummyIngredients } from '../../models/ingredient';
import db from '../../services/db/db';
import { RootState } from '../store';

export interface IngredientsListSlice {
  ingredients: Ingredient[];
  scannedIngredients: Ingredient[];
}

const initialState: IngredientsListSlice = {
  ingredients: [],
  scannedIngredients: [],
};

export const fetchIngredients = createAsyncThunk(
  'ingredientList/fetchAllItems',
  async (userId: string) => {
    const ingredients = await db.getUserIngredients(userId);
    return ingredients;
  }
);

export const addIngredientItem = createAsyncThunk(
  'ingredientList/addItem',
  async (payload: Record<string, any>) => {
    const newItemId = await db.addToUserIngredients(
      payload.userId,
      payload.item
    );
    return { ...payload.item, id: newItemId };
  }
);

export const removeIngredientItem = createAsyncThunk(
  'ingredientList/removeItem',
  async (payload: Record<string, any>) => {
    await db.deleteUserIngredient(payload.userId, payload.itemId);
    return payload.itemId;
  }
);

export const updateIngredient = createAsyncThunk(
  'ingredientList/updateItem',
  async (payload: Record<string, any>) => {
    await db.updateUserIngredient(payload.userId, payload.item);
    return payload.item;
  }
);
// ============================== SLICE ==============================

export const ingredientsListSlice = createSlice({
  name: 'ingredientsList',
  initialState,
  reducers: {
    addIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients.push(...action.payload);
    },
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload;
    },
    setScannedIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.scannedIngredients = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
    builder.addCase(addIngredientItem.fulfilled, (state, action) => {
      const exists = state.ingredients.some(
        (ing) => ing.name === action.payload.name
      );
      if (exists) return;
      state.ingredients.unshift(action.payload);
    });
    builder.addCase(removeIngredientItem.fulfilled, (state, action) => {
      state.ingredients.splice(
        state.ingredients.findIndex((ing) => ing.id == action.payload),
        1
      );
    });
    builder.addCase(updateIngredient.fulfilled, (state, action) => {
      const existingItemIdx = state.ingredients.findIndex(
        (ing) => ing.id === action.payload.id
      );
      if (existingItemIdx >= 0) {
        state.ingredients.splice(existingItemIdx, 1, action.payload);
      }
    });
  },
});
// ============================== ACTIONS ==============================
export const { setIngredients, addIngredients, setScannedIngredients } =
  ingredientsListSlice.actions;
// ============================== GETTERS ==============================
export const selectIngredientsList = (state: RootState) =>
  state.ingredients.ingredients;
export const selectScannedIngredients = (state: RootState) =>
  state.ingredients.scannedIngredients;

export default ingredientsListSlice.reducer;
