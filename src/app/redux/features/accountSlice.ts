import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

export interface AccountState {
  credits: string;
  name: string;
  figmaUserID: string;
  photoUrl: string;
}

const initialState = {
  credits: null,
  name: null,
  figmaUserID: null,
  photoUrl: null
} satisfies AccountState as AccountState;

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<AccountState>) {
      state.name = action.payload.name;
      state.figmaUserID = action.payload.figmaUserID;
      state.photoUrl = action.payload.photoUrl;
      state.credits = action.payload.credits;
    }
  }
});

export const getAccount = createSelector((state: RootState) => state.account, (account: AccountState) => account);

export const { setAccount } = accountSlice.actions;
