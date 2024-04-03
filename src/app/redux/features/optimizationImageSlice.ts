import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ImagesState {
  images: Uint8Array[];
}

const initialState = {
  images: [],
} satisfies ImagesState as ImagesState;

export const optimizationImageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImagesForOptimization(state, action: PayloadAction<Uint8Array[]>) {
      state.images = action.payload
    },
  }
});

export const getImages = (state: ImagesState) => state.images;

export const { setImagesForOptimization } = optimizationImageSlice.actions;
