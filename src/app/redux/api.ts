import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/lib/generateSignature';

export interface ErrorResponseType {
  data: {
    statusCode: number;
    message: string;
  },
  status: number;
}

export const createBaseApi = (reducerPath: string) => createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_API_URL,
    prepareHeaders: (headers, { endpoint }) => {
      return prepareHeaders(headers, endpoint);
    },
  }),
  endpoints: () => ({}),
})