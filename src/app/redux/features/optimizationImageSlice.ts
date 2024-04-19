import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

interface ImagesState {
  images: ImageInfo[];
  selectedImages: ImageInfo[];
  isLoading: boolean;
}

const initialState = {
  images: [],
  selectedImages: [],
  isLoading: true,
} satisfies ImagesState as ImagesState;

export const optimizationImageSlice = createSlice({
  name: 'optimizationImages',
  initialState,
  reducers: {
    setSelectedImages(state, action: PayloadAction<ImageInfo[]>) {
      state.selectedImages = [
        ...state.selectedImages,
        ...action.payload
      ]
    },
    removeSelectedImages(state, action: PayloadAction<string>) {
      state.selectedImages = state.selectedImages.filter(i => i.uuid !== action.payload);
    },
    setImagesForOptimization(state, action: PayloadAction<ImageInfo[]>) {
      state.images = [
        ...state.images,
        ...action.payload
      ]
      state.isLoading = false;
    },
  }
});

export const getImages = (state: RootState) => state.optimizationImages;
export const getSelectedImages = (state: RootState) => state.optimizationImages.selectedImages;

export const { setImagesForOptimization, setSelectedImages, removeSelectedImages } = optimizationImageSlice.actions;
