import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Ingredient, { dummyIngredients } from '../../models/ingredient';
import db from '../../services/db/db';
import { RootState } from '../store';

export interface ShoppingListSlice {
  shoppingItems: Ingredient[];
}

const initialState: ShoppingListSlice = {
  shoppingItems: Array<Ingredient>(),
};

export const addShoppingItem = createAsyncThunk(
  'shoppinglist/add',
  async (payload: Record<string, any>) => {
    const newItemId = await db.addToUserShoppingList(
      payload.userId,
      payload.item
    );
    return { ...payload.item, id: newItemId };
  }
);

export const removeShoppingItem = createAsyncThunk(
  'shoppingList/remove',
  async (payload: Record<string, any>) => {
    await db.deleteUserShoppingListItem(payload.userId, payload.itemId);
    return payload.itemId;
  }
);

export const updateShoppingItem = createAsyncThunk(
  'shoppingList/update',
  async (payload: Record<string, any>) => {
    await db.updateUserShoppingListItem(payload.userId, payload.item);
    return payload.item;
  }
);
// ============================== SLICE ==============================
export const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addShoppingList: (state, action: PayloadAction<Ingredient[]>) => {
      state.shoppingItems.push(...action.payload);
    },
    setShoppingItemsList: (state, action: PayloadAction<Ingredient[]>) => {
      state.shoppingItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addShoppingItem.fulfilled, (state, action) => {
      const exists = state.shoppingItems.some(
        (ing) => ing.name === action.payload.name
      );
      if (exists) return;
      state.shoppingItems.unshift(action.payload);
    });

    builder.addCase(removeShoppingItem.fulfilled, (state, action) => {
      const existingItemIdx = state.shoppingItems.findIndex(
        (ing) => ing.id === action.payload
      );
      if (existingItemIdx >= 0) {
        state.shoppingItems.splice(existingItemIdx, 1);
      }
    });
    builder.addCase(updateShoppingItem.fulfilled, (state, action) => {
      const existingItemIdx = state.shoppingItems.findIndex(
        (ing) => ing.id === action.payload.id
      );
      if (existingItemIdx >= 0) {
        state.shoppingItems.splice(existingItemIdx, 1, action.payload);
      }
    });
  },
});
// ============================== ACTIONS ==============================
export const { setShoppingItemsList, addShoppingList } =
  shoppingListSlice.actions;
// ============================== GETTERS ==============================
export const selectShoppingItemsList = (state: RootState) =>
  state.shoppingList.shoppingItems;

export default shoppingListSlice.reducer;
