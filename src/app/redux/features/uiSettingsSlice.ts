import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

interface UiSettingsState {
  isSingleMode: boolean;
}

const initialState = {
  isSingleMode: false,
} satisfies UiSettingsState as UiSettingsState;

export const uiSettingsSlice = createSlice({
  name: 'uiSettings',
  initialState: initialState,
  reducers: {
    updateMode(state, action: PayloadAction<{ isSingleMode: boolean }>) {
      state.isSingleMode = action.payload.isSingleMode;
    },
  },
});

export const getIsSingleMode = (state: RootState) =>
  state.uiSettings.isSingleMode;

export const { updateMode } = uiSettingsSlice.actions;
