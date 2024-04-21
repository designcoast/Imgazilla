import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

interface ImagesState {
  images: ImageInfo[];
  generalOptimizationPercent: number;
  isLoading: boolean;
}

const initialState = {
  images: [],
  generalOptimizationPercent: 100,
  isLoading: true,
} satisfies ImagesState as ImagesState;

export const optimizationImageSlice = createSlice({
  name: 'optimizationImages',
  initialState,
  reducers: {
    setSelectedImages(state, action: PayloadAction<{ uuid: string }>) {
      const index = state.images.findIndex(item => item.uuid === action.payload.uuid);
      if (index !== -1) {
        state.images[index] = {
          ...state.images[index],
          isSelected: true
        };
      }
    },
    removeSelectedImages(state, action: PayloadAction<{ uuid: string }>) {
      const index = state.images.findIndex(item => item.uuid === action.payload.uuid);
      if (index !== -1) {
        state.images[index] = {
          ...state.images[index],
          isSelected: false
        };
      }
    },
    setImagesForOptimization(state, action: PayloadAction<ImageInfo[]>) {
      state.images = [
        ...state.images,
        ...action.payload
      ]
      state.isLoading = false;
    },
    updateGeneralOptimizationPercent(state, action: PayloadAction<number>) {
      state.generalOptimizationPercent = action.payload;
    },
    updateImageOptimizationPercent(state, action: PayloadAction<{uuid: string, percent: number}>) {
      state.images = state.images.map((item) => {
        if(item.uuid === action.payload.uuid) {
          return {
            ...item,
            optimizationPercent: action.payload.percent
          }
        }
        return item;
      })
    },
    unselectAllImages(state) {
      state.images = state.images.map((item) => {
        return {
          ...item,
          isSelected: false
        }
      })
    },
    selectAllImages(state) {
      state.images = state.images.map((item) => {
        return {
          ...item,
          isSelected: true
        }
      })
    }
  }
});

export const getImages = (state: RootState) => state.optimizationImages.images;
export const getIsLoading = (state: RootState) => state.optimizationImages.isLoading;

export const getSelectedImagesCount = (state: RootState) =>
  state.optimizationImages.images.filter((item) => item.isSelected).length;
export const getGeneralOptimizationPercent = (state: RootState) => state.optimizationImages.generalOptimizationPercent;

export const {
  setImagesForOptimization,
  setSelectedImages,
  removeSelectedImages,
  updateGeneralOptimizationPercent,
  updateImageOptimizationPercent,
  unselectAllImages,
  selectAllImages,
} = optimizationImageSlice.actions;
