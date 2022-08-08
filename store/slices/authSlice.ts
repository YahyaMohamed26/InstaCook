import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';
import Recipe, { dummyRecipes } from '../../models/recipe';
import User from '../../models/user';
import { RootState } from '../store';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

// ============================== SLICE ==============================
export const authSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    clearUser: (state) => (state.user = null),
  },
});
// ============================== ACTIONS ==============================
export const { setUser, clearUser } = authSlice.actions;
// ============================== GETTERS ==============================
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
