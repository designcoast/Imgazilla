import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';
import { PDF_FORMAT } from '@/app/constants';

interface ImagesState {
  images: ImageInfo[];
  result: ImageOptimizationResult[];
  jobId: string;
  generalOptimizationPercent: number;
  isLoading: boolean;
  isImageOptimizationResultsOpen: boolean;
  isArchiveDownloaded: boolean;
}

const initialState = {
  images: [],
  result: [],
  jobId: undefined,
  generalOptimizationPercent: 100,
  isLoading: true,
  isImageOptimizationResultsOpen: false,
  isArchiveDownloaded: false,
} satisfies ImagesState as ImagesState;

export const optimizationImageSlice = createSlice({
  name: 'optimizationImages',
  initialState,
  reducers: {
    setSelectedImages(state, action: PayloadAction<{ uuid: string }>) {
      const index = state.images.findIndex(
        (item) => item.uuid === action.payload.uuid,
      );
      if (index !== -1) {
        state.images[index] = {
          ...state.images[index],
          isSelected: true,
        };
      }
    },
    removeSelectedImages(state, action: PayloadAction<{ uuid: string }>) {
      const index = state.images.findIndex(
        (item) => item.uuid === action.payload.uuid,
      );
      if (index !== -1) {
        state.images[index] = {
          ...state.images[index],
          isSelected: false,
        };
      }
    },
    setImagesForOptimization(state, action: PayloadAction<ImageInfo[]>) {
      state.images = [...state.images, ...action.payload];
      state.isLoading = false;
    },
    updateGeneralOptimizationPercent(state, action: PayloadAction<number>) {
      state.generalOptimizationPercent = action.payload;
    },
    updateImageOptimizationPercent(
      state,
      action: PayloadAction<{ uuid: string; percent: number }>,
    ) {
      state.images = state.images.map((item) => {
        if (item.uuid === action.payload.uuid) {
          return {
            ...item,
            optimizationPercent: action.payload.percent,
          };
        }
        return item;
      });
    },
    updateImageFormat(
      state,
      action: PayloadAction<{ uuid: string; format: string }>,
    ) {
      state.images = state.images.map((item) => {
        if (item.uuid === action.payload.uuid) {
          return {
            ...item,
            format: action.payload.format,
          };
        }
        return item;
      });
    },
    updateAllImageFormat(state, action: PayloadAction<{ format: string }>) {
      state.images = state.images.map((item) => {
        return {
          ...item,
          format: action.payload.format,
        };
      });
    },
    updateAllImageOptimizationPercent(state, action: PayloadAction<number>) {
      state.images = state.images.map((item) => {
        if (item.format !== PDF_FORMAT) {
          return {
            ...item,
            optimizationPercent: action.payload,
          };
        }
        return item;
      });
    },
    unselectAllImages(state) {
      state.images = state.images.map((item) => {
        return {
          ...item,
          isSelected: false,
        };
      });
    },
    selectAllImages(state) {
      state.images = state.images.map((item) => {
        return {
          ...item,
          isSelected: true,
        };
      });
    },
    setImageOptimizationJobId(state, action: PayloadAction<{ jobId: string }>) {
      state.jobId = action.payload.jobId;
    },
    setImageOptimizationResult(
      state,
      action: PayloadAction<{ result: ImageOptimizationResult[] }>,
    ) {
      state.result = action.payload.result;
    },
    setImageOptimizationResultPageState(
      state,
      action: PayloadAction<{ isOpen: boolean }>,
    ) {
      state.isImageOptimizationResultsOpen = action.payload.isOpen;
    },
    setIsArchiveDownload(
      state,
      action: PayloadAction<{ isDownloaded: boolean }>,
    ) {
      state.isArchiveDownloaded = action.payload.isDownloaded;
    },
    reset: () => initialState,
  },
});

export const getImages = (state: RootState) => state.optimizationImages.images;

export const getIsImageOptimizationResultsOpen = (state: RootState) =>
  state.optimizationImages.isImageOptimizationResultsOpen;
export const getImageOptimizationJobId = (state: RootState) =>
  state.optimizationImages.jobId;
export const getImageOptimizationResult = (state: RootState) =>
  state.optimizationImages.result;
export const getIsArchiveDownloadedState = (state: RootState) =>
  state.optimizationImages.isArchiveDownloaded;
export const getIsLoading = (state: RootState) =>
  state.optimizationImages.isLoading;

export const getSelectedImagesCount = (state: RootState) =>
  state.optimizationImages.images.filter((item) => item.isSelected).length;

export const getSelectedImages = createSelector([getImages], (images) =>
  images.filter((item) => item.isSelected),
);

export const getFilteredOptimizationResult = createSelector(
  [getSelectedImages, getImageOptimizationResult],
  (images, result) => {
    const uuids = new Set(images.map((item) => item.uuid));
    return result.filter((img) => uuids.has(img.uuid));
  },
);

export const getGeneralOptimizationPercent = (state: RootState) =>
  state.optimizationImages.generalOptimizationPercent;

export const {
  reset,
  selectAllImages,
  setSelectedImages,
  unselectAllImages,
  updateImageFormat,
  updateAllImageFormat,
  removeSelectedImages,
  setImagesForOptimization,
  setImageOptimizationJobId,
  setImageOptimizationResult,
  updateImageOptimizationPercent,
  updateGeneralOptimizationPercent,
  updateAllImageOptimizationPercent,
  setImageOptimizationResultPageState,
} = optimizationImageSlice.actions;
