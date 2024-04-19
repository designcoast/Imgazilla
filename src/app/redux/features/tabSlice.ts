import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

export const FAVICON_TAB = 'favicon';
export const IMAGE_OPTIMIZATION_TAB = 'imagesOptimization'

export interface TabState {
  name: string;
}

const initialState = {
  name: FAVICON_TAB,
} satisfies TabState as TabState;

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TabState>) {
      state.name = action.payload.name;
    }
  }
});

export const getSelectedTab = (state: RootState) => state.tab.name;

export const { setActiveTab } = tabSlice.actions;
