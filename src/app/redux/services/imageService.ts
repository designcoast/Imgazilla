import { createBaseApi } from '@/app/redux/api';

export const IMAGE_OPTIMIZATION_SERVICE_REDUCER_KEY = 'imageService';

const baseApi = createBaseApi(IMAGE_OPTIMIZATION_SERVICE_REDUCER_KEY);

export const imageOptimizationService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    optimizeImage: builder.mutation({
      query: (body: any) => ({
        url: 'image/optimize',
        method: 'POST',
        body,
      }),
    }),
    getProcessStatus: builder.query({
      query: (id: string) => `image/${id}/status`,
    }),
    getOptimizedImage: builder.query({
      query: (id: string) => `image/${id}/result`,
    }),
  }),
});

export const {
  useOptimizeImageMutation,
  useLazyGetProcessStatusQuery,
  useLazyGetOptimizedImageQuery,
} = imageOptimizationService;
