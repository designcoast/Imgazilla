import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

interface ImagesState {
  images: ImageInfo[];
  result: ImageOptimizationResult[];
  jobId: string;
  generalOptimizationPercent: number;
  isLoading: boolean;
  isImageOptimizationResultsOpen: boolean
}

const initialState = {
  images: [],
  result: [],
  jobId: undefined,
  generalOptimizationPercent: 100,
  isLoading: true,
  isImageOptimizationResultsOpen: false,
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
    },

    setImageOptimizationJobId(state, action: PayloadAction<{jobId: string}>){
      state.jobId = action.payload.jobId;
    },

    setImageOptimizationResult(state, action: PayloadAction<{ result: ImageOptimizationResult[] }>) {
      state.result = action.payload.result;
    },

    setImageOptimizationResultPageState(state, action: PayloadAction<{ isOpen: boolean}>) {
      state.isImageOptimizationResultsOpen = action.payload.isOpen
    },
    reset: () => initialState
  }
});

export const getImages = (state: RootState) => state.optimizationImages.images;
export const getIsImageOptimizationResultsOpen = (state: RootState) => state.optimizationImages.isImageOptimizationResultsOpen;
export const getImageOptimizationJobId = (state: RootState) => state.optimizationImages.jobId;
export const getImageOptimizationResult = (state: RootState) => state.optimizationImages.result;

export const getIsLoading = (state: RootState) => state.optimizationImages.isLoading;

export const getSelectedImagesCount = (state: RootState) =>
  state.optimizationImages.images.filter((item) => item.isSelected).length;

export const getSelectedImages = createSelector(
  [getImages],
  (images) => images.filter((item) => item.isSelected)
);

export const getGeneralOptimizationPercent = (state: RootState) => state.optimizationImages.generalOptimizationPercent;

export const {
  reset,
  selectAllImages,
  setSelectedImages,
  unselectAllImages,
  removeSelectedImages,
  setImagesForOptimization,
  setImageOptimizationJobId,
  setImageOptimizationResult,
  updateImageOptimizationPercent,
  updateGeneralOptimizationPercent,
  setImageOptimizationResultPageState,
} = optimizationImageSlice.actions;
