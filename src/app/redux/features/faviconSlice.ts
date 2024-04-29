import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

interface FaviconState {
  imageData: Uint8Array;
  faviconSettings: {
    websiteName?: string;
    themeColor?: string;
    platforms: {
      default: boolean;
      iOS: boolean;
      android: boolean;
    };
  };
}

const initialState = {
  imageData: undefined,
  faviconSettings: {
    websiteName: '',
    themeColor: '',
    platforms: {
      default: true,
      iOS: false,
      android: false
    }
  }
} satisfies FaviconState as FaviconState;

export const faviconSlice = createSlice({
  name: 'favicon',
  initialState,
  reducers: {
    updateSelectedImage(state, action: PayloadAction<Uint8Array>) {
      state.imageData = action.payload
    },
    updateFaviconSettings(state, action: PayloadAction<Pick<FaviconState, 'faviconSettings'>>) {
      state.faviconSettings = action.payload.faviconSettings
    }
  }
});

export const getFaviconImageData = (state: RootState) => state.favicon.imageData;
export const getFaviconSettings = (state: RootState) => state.favicon.faviconSettings;

export const { updateSelectedImage, updateFaviconSettings } = faviconSlice.actions;