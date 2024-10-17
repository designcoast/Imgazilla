import { createBaseApi } from '@/app/redux/api';

export const BACKGROUND_REMOVAL_SERVICE_REDUCER_KEY =
  'backgroundRemovalService';

export const baseApi = createBaseApi(BACKGROUND_REMOVAL_SERVICE_REDUCER_KEY);

export const backgroundRemovalService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    removeImageBackground: builder.mutation({
      query: (body: { image: string }) => ({
        url: 'background-removal/remove',
        method: 'POST',
        body,
      }),
    }),
    getBackgroundRemovalProcessStatus: builder.query({
      query: (id: string) => `background-removal/${id}/status`,
    }),
    getBackgroundRemovalResult: builder.query({
      query: (id: string) => `background-removal/${id}/result`,
    }),
  }),
});

export const {
  useRemoveImageBackgroundMutation,
  useLazyGetBackgroundRemovalProcessStatusQuery,
  useLazyGetBackgroundRemovalResultQuery,
} = backgroundRemovalService;
