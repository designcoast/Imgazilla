import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

interface BackgroundRemovalState {
  imageData: Uint8Array;
}

const initialState = {
  imageData: undefined,
} satisfies BackgroundRemovalState as BackgroundRemovalState;

export const backgroundRemovalSlice = createSlice({
  name: 'backgroundRemoval',
  initialState,
  reducers: {
    setSelectedImage(state, action: PayloadAction<Uint8Array>) {
      state.imageData = action.payload;
    },
  },
});

export const getSelectedImage = (state: RootState) =>
  state.backgroundRemoval.imageData;

export const { setSelectedImage } = backgroundRemovalSlice.actions;
