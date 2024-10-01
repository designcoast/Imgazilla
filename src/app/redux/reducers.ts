import {
  FAVICON_SERVICE_REDUCER_KEY,
  ACCOUNT_SERVICE_REDUCER_KEY,
  SIGNAL_SERVICE_REDUCER_KEY,
  IMAGE_OPTIMIZATION_SERVICE_REDUCER_KEY,
} from '@/app/redux/services';
import {
  faviconService,
  accountService,
  signalService,
  imageOptimizationService,
} from '@/app/redux/services';

import {
  faviconSlice,
  accountSlice,
  optimizationImageSlice,
  tabSlice,
  settingsSlice,
  uiSettingsSlice,
} from '@/app/redux/features';
import { errorHandlingMiddleware } from '@/app/redux/middlewares/errorHandlingMiddleware';

export const reducers = {
  [FAVICON_SERVICE_REDUCER_KEY]: faviconService.reducer,
  [ACCOUNT_SERVICE_REDUCER_KEY]: accountService.reducer,
  [SIGNAL_SERVICE_REDUCER_KEY]: signalService.reducer,
  [IMAGE_OPTIMIZATION_SERVICE_REDUCER_KEY]: imageOptimizationService.reducer,
  [faviconSlice.name]: faviconSlice.reducer,
  [accountSlice.name]: accountSlice.reducer,
  [optimizationImageSlice.name]: optimizationImageSlice.reducer,
  [tabSlice.name]: tabSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
  [uiSettingsSlice.name]: uiSettingsSlice.reducer,
};

export const middlewares = [
  accountService.middleware,
  faviconService.middleware,
  signalService.middleware,
  imageOptimizationService.middleware,
  errorHandlingMiddleware,
];
