import { createBaseApi } from '@/app/redux/api';
import { AccountState } from '@/app/redux/features';

export const ACCOUNT_SERVICE_REDUCER_KEY = 'accountService';

const baseApi = createBaseApi(ACCOUNT_SERVICE_REDUCER_KEY);

interface CreateAccountBody {
  id: string;
  name: string;
  photoUrl: string;
}

export const accountService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAccount: builder.query<AccountState, string>({
      query: (id: string) => `/account/getAccount?id=${id}`
    }),
    createAccount: builder.mutation({
      query: (body: CreateAccountBody) => ({
        url: '/account/createAccount',
        method: 'POST',
        body: body
      })
    })
  })
})

export const { useLazyCheckAccountQuery, useCreateAccountMutation } = accountService;
