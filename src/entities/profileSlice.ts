import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Category, Cost, Operation } from '../graphql.types';

export interface ProfileDto {
  name: string;
  about: string;
  isAdmin: boolean;
}

export interface ProfileState {
  authProfileInfo: ProfileDto | null;
  authToken: string | null;
  costList: Operation[];
  categoryList: Category[];
}

const initialState: ProfileState = {
  authToken: undefined,
  authProfileInfo: null,
  costList: [],
  categoryList: [],
};

export const profileSlice = createSlice({
  name: `profile`,
  initialState,
  reducers: {
    getToken: (_, __: PayloadAction<string>) => {
      undefined;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    getProfileInfo: (_, __: PayloadAction<ProfileDto>) => {
      null;
    },
    setProfileInfo: (state, action: PayloadAction<ProfileDto | null>) => {
      state.authProfileInfo = action.payload;
    },
    getCostList: (_, __: PayloadAction<Cost[]>) => {
      [];
    },
    setCostList: (state, action: PayloadAction<Operation[]>) => {
      state.costList = action.payload;
    },
    getCategoryList: (_, __: PayloadAction<Category[]>) => {
      [];
    },
    setCategoryList: (state, action: PayloadAction<Category[]>) => {
      state.categoryList = action.payload;
    },
  },
});

export const { actions: profileActions } = profileSlice;

export const profileSelector = createSelector(
  (state: RootState): ProfileState => state.profile,
  (profile) => profile
);
