import { createBaseApi } from '@/app/redux/api';

export const ACCOUNT_SERVICE_REDUCER_KEY = 'accountService';

const baseApi = createBaseApi(ACCOUNT_SERVICE_REDUCER_KEY);

export const accountService = baseApi.injectEndpoints({
  endpoints: (_build) => ({})
})