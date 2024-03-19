import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
  coinsCount: number;
  name: string;
  figmaUserID: string;
  photoUrl: string;
}

const initialState = {
  coinsCount: 0,
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
      state.coinsCount = action.payload.coinsCount;
    }
  }
});

export const { setAccount } = accountSlice.actions;
