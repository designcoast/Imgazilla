import { createBaseApi } from '@/app/redux/api';

export const FAVICON_SERVICE_REDUCER_KEY = 'faviconService';

const baseApi = createBaseApi(FAVICON_SERVICE_REDUCER_KEY);

export const faviconService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateFavicon: builder.mutation({
      query: (body: any) => ({
        url: 'favicon/generate',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGenerateFaviconMutation } = faviconService;
