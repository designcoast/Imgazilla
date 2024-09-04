import {
  createSlice,
  createSelector,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

export const FAVICON_TAB = 'favicon';
export const IMAGE_OPTIMIZATION_TAB = 'imagesOptimization';

export interface TabState {
  activeTab: string;
  tabs: {
    name: string;
    isDisabled: boolean;
  }[];
}

const initialState = {
  activeTab: FAVICON_TAB,
  tabs: [
    { name: FAVICON_TAB, isDisabled: false },
    { name: IMAGE_OPTIMIZATION_TAB, isDisabled: false },
  ],
} satisfies TabState as TabState;

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    setDisableTab(
      state,
      action: PayloadAction<{ name: string; isDisabled: boolean }>,
    ) {
      const { name, isDisabled } = action.payload;
      const tab = state.tabs.find((tab) => tab.name === name);
      if (tab) {
        tab.isDisabled = isDisabled;
      }
    },
  },
});

const selectTabs = (state: RootState) => state.tab.tabs;

export const getActiveTab = (state: RootState) => state.tab.activeTab;

export const selectDisabledTab = createSelector([selectTabs], (tabs) =>
  tabs.find((tab) => tab.isDisabled),
);
export const { setActiveTab, setDisableTab } = tabSlice.actions;
