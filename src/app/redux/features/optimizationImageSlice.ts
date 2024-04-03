import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

interface ImagesState {
  images: Uint8Array[];
  isLoading: boolean;
}

const initialState = {
  images: [],
  isLoading: true,
} satisfies ImagesState as ImagesState;

export const optimizationImageSlice = createSlice({
  name: 'optimizationImages',
  initialState,
  reducers: {
    setImagesForOptimization(state, action: PayloadAction<Uint8Array[]>) {
      state.images = action.payload
      state.isLoading = false;
    },
  }
});

export const getImages = (state: RootState) => state.optimizationImages;

export const { setImagesForOptimization } = optimizationImageSlice.actions;
