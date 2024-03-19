import { createBaseApi } from '@/app/redux/api';

export const ACCOUNT_SERVICE_REDUCER_KEY = 'accountService';

const baseApi = createBaseApi(ACCOUNT_SERVICE_REDUCER_KEY);

export const accountService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAccount: builder.query({
      query: (id: string) => `/account/check?id=${id}`
    })
  })
})

export const { useCheckAccountQuery, useLazyCheckAccountQuery } = accountService;
