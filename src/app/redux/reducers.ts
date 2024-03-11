import { FAVICON_SERVICE_REDUCER_KEY, faviconService } from '@/app/redux/services';

import { faviconSlice, accountSlice } from '@/app/redux/features'

export const reducers = {
  [FAVICON_SERVICE_REDUCER_KEY]: faviconService.reducer,
  [faviconSlice.name]: faviconSlice.reducer,
  [accountSlice.name]: accountSlice.reducer
}