import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  name: string;
  id: string;
  avatarUrl: string;
}

const initialState = {
  name: null,
  id: null,
  avatarUrl: null
} satisfies AccountState as AccountState;

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateAccountInfo(state, action: PayloadAction<AccountState>) {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.avatarUrl = action.payload.avatarUrl;
    }
  }
});

export const { updateAccountInfo } = accountSlice.actions;
