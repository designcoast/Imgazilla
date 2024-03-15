import { FAVICON_SERVICE_REDUCER_KEY, ACCOUNT_SERVICE_REDUCER_KEY } from '@/app/redux/services';
import { faviconService, accountService } from '@/app/redux/services';

import { faviconSlice, accountSlice } from '@/app/redux/features';

export const reducers = {
  [FAVICON_SERVICE_REDUCER_KEY]: faviconService.reducer,
  [ACCOUNT_SERVICE_REDUCER_KEY]: accountService.reducer,
  [faviconSlice.name]: faviconSlice.reducer,
  [accountSlice.name]: accountSlice.reducer
}