import { FAVICON_SERVICE_REDUCER_KEY, faviconService } from '@/app/redux/services';

export const reducers = {
  [FAVICON_SERVICE_REDUCER_KEY]: faviconService.reducer
}