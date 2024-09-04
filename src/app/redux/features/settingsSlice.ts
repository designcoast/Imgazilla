import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';
import {
  globalSettingsInitState,
  GlobalSettingsType,
} from '@/plugin/FigmaGlobalSettingsManager';

export const initialSettingsState =
  globalSettingsInitState satisfies GlobalSettingsType as GlobalSettingsType;

export const settingsSlice = createSlice({
  name: 'pluginSettings',
  initialState: initialSettingsState,
  reducers: {
    setPluginSettings(state, action: PayloadAction<GlobalSettingsType>) {
      state.settings = action.payload.settings;
    },
  },
});

export const getPluginSettings = (state: RootState) =>
  state.pluginSettings.settings;

export const { setPluginSettings } = settingsSlice.actions;
