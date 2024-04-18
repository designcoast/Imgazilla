import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

interface FaviconState {
  imageData: Uint8Array;
  faviconSettings: {
    websiteName?: string;
    themeColor?: string;
    platforms: {
      iOS: boolean;
      android: boolean;
      windows: boolean;
    };
  };
}

const initialState = {
  imageData: undefined,
  faviconSettings: {
    websiteName: undefined,
    themeColor: undefined,
    platforms: {
      iOS: true,
      android: false,
      windows: false
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


export const { updateSelectedImage, updateFaviconSettings } = faviconSlice.actions;