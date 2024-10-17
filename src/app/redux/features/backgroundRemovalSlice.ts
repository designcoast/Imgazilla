import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

interface BackgroundRemovalState {
  imageData?: Uint8Array;
  processedImageData?: string;
  jobId?: string;
}

const initialState = {
  imageData: undefined,
  jobId: undefined,
  processedImageData: undefined,
} satisfies BackgroundRemovalState as BackgroundRemovalState;

export const backgroundRemovalSlice = createSlice({
  name: 'backgroundRemoval',
  initialState,
  reducers: {
    setSelectedImage(state, action: PayloadAction<Uint8Array>) {
      state.imageData = action.payload;
    },
    setBackgroundRemovalJobId(state, action: PayloadAction<{ jobId: string }>) {
      state.jobId = action.payload.jobId;
    },
    setBackgroundRemovalResult(
      state,
      action: PayloadAction<{ processedImageData: string }>,
    ) {
      state.processedImageData = action.payload.processedImageData;
    },
    resetBackgroundRemovalState: () => initialState,
  },
});

export const getSelectedBackgroundRemovalImage = (state: RootState) =>
  state.backgroundRemoval.imageData;

export const getBackgroundRemovalProcessJobId = (state: RootState) =>
  state.backgroundRemoval.jobId;

export const getBackgroundRemovalProcessResult = (state: RootState) =>
  state.backgroundRemoval.processedImageData;

export const {
  setSelectedImage,
  setBackgroundRemovalJobId,
  setBackgroundRemovalResult,
  resetBackgroundRemovalState,
} = backgroundRemovalSlice.actions;
