import { createSlice } from '@reduxjs/toolkit';

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
  reducers: {}
});