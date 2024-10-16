import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

interface BackgroundRemovalState {
  imageData?: Uint8Array;
  processedImageData?: Uint8Array;
  jobId?: string;
}

const initialState = {
  imageData: undefined,
  jobId: undefined,
  processedImageData: undefined,
  // isProcessing: false,
  // isJobFinished: false,
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
      action: PayloadAction<{ processedImageData: Uint8Array }>,
    ) {
      state.processedImageData = action.payload.processedImageData;
    },
    resetBackgroundRemovalState: () => initialState,
  },
});

export const getSelectedBackgroundRemovalImage = (state: RootState) =>
  state.backgroundRemoval.imageData;

export const {
  setSelectedImage,
  setBackgroundRemovalJobId,
  setBackgroundRemovalResult,
  resetBackgroundRemovalState,
} = backgroundRemovalSlice.actions;
