import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface SharedState {
  isCameraOpen: boolean;
  isLoading: boolean;
  hideTabBar: boolean;
  isFetchingUserDetails: boolean;
}

const initialState: SharedState = {
  isCameraOpen: false,
  isLoading: true,
  hideTabBar: false,
  isFetchingUserDetails: false,
};

// ============================== SLICE ==============================
export const suggestedRecipesSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setIsCameraOpen: (state, action: PayloadAction<boolean>) => {
      state.isCameraOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setHideTabBar: (state, action: PayloadAction<boolean>) => {
      state.hideTabBar = action.payload;
    },
    setIsFetchingUserDetails: (state, action: PayloadAction<boolean>) => {
      state.isFetchingUserDetails = action.payload;
    },
  },
});
// ============================== ACTIONS ==============================
export const {
  setIsCameraOpen,
  setLoading,
  setHideTabBar,
  setIsFetchingUserDetails,
} = suggestedRecipesSlice.actions;
// ============================== GETTERS ==============================
export const selectIsCameraOpen = (state: RootState) =>
  state.shared.isCameraOpen;

export const selectIsLoading = (state: RootState) => state.shared.isLoading;
export const selectHideTabBar = (state: RootState) => state.shared.hideTabBar;
export const selectIsFetchingUserDetails = (state: RootState) =>
  state.shared.isFetchingUserDetails;

export default suggestedRecipesSlice.reducer;
