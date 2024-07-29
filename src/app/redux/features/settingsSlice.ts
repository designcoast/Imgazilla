import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

export interface SettingsState {
  settings: {
    themeColorHistory: string[];
    bgColorHistory: string[];
  }
}

const initialState = {
  settings: {
    themeColorHistory: [],
    bgColorHistory: [],
  }
} satisfies SettingsState as SettingsState;

export const settingsSlice = createSlice({
  name: 'pluginSettings',
  initialState,
  reducers: {
    setPluginSettings(state, action: PayloadAction<{ themeColorHistory: string[]; bgColorHistory: string[] }>) {
      state.settings = action.payload;
    }
  }
})

export const getPluginSettings = (state: RootState) => state.pluginSettings.settings;

export const { setPluginSettings } = settingsSlice.actions;