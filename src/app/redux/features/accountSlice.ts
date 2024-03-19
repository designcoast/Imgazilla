import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  name: string;
  id: string;
  photoUrl: string;
}

const initialState = {
  name: null,
  id: null,
  photoUrl: null
} satisfies AccountState as AccountState;

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateAccountInfo(state, action: PayloadAction<AccountState>) {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.photoUrl = action.payload.photoUrl;
    }
  }
});

export const { updateAccountInfo } = accountSlice.actions;
