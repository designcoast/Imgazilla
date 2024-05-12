import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

export const FAVICON_TAB = 'favicon';
export const IMAGE_OPTIMIZATION_TAB = 'imagesOptimization'

export interface TabState {
  tabs: {
    name: string,
    isActive: boolean
    isDisabled: boolean
  }[]
}

const initialState = {
  tabs: [
    { name: FAVICON_TAB, isActive: true, isDisabled: false },
    { name: IMAGE_OPTIMIZATION_TAB, isActive: false, isDisabled: false },
  ]
} satisfies TabState as TabState;

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<{ name: string, isActive: boolean }>) {
      const { name, isActive } = action.payload;
      const tab = state.tabs.find(tab => tab.name === name);
      if (tab) {
        tab.isActive = isActive;
      }
    },
    setDisableTab(state, action: PayloadAction<{ name: string, isDisabled: boolean }>) {
      const { name, isDisabled } = action.payload;
      const tab = state.tabs.find(tab => tab.name === name);
      if (tab) {
        tab.isDisabled = isDisabled;
      }
    }
  }
});

const selectTabs = (state: RootState) => state.tab.tabs;

export const selectActiveTab = createSelector(
  [selectTabs],
  (tabs) => tabs.find(tab => tab.isActive)
);

export const selectDisabledTab = createSelector(
  [selectTabs],
  (tabs) => tabs.find(tab => tab.isDisabled)
);
export const { setActiveTab, setDisableTab } = tabSlice.actions;
