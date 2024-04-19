import {
  FAVICON_SERVICE_REDUCER_KEY,
  ACCOUNT_SERVICE_REDUCER_KEY,
  SIGNAL_SERVICE_REDUCER_KEY
} from '@/app/redux/services';
import { faviconService, accountService, signalService } from '@/app/redux/services';

import { faviconSlice, accountSlice, optimizationImageSlice, tabSlice } from '@/app/redux/features';

export const reducers = {
  [FAVICON_SERVICE_REDUCER_KEY]: faviconService.reducer,
  [ACCOUNT_SERVICE_REDUCER_KEY]: accountService.reducer,
  [SIGNAL_SERVICE_REDUCER_KEY]: signalService.reducer,
  [faviconSlice.name]: faviconSlice.reducer,
  [accountSlice.name]: accountSlice.reducer,
  [optimizationImageSlice.name]: optimizationImageSlice.reducer,
  [tabSlice.name]: tabSlice.reducer
}