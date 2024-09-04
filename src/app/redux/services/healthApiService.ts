import { createBaseApi } from '@/app/redux/api';

export const HEALTH_API_SERVICE = 'healthApiService';

const baseApi = createBaseApi(HEALTH_API_SERVICE);

interface ServerResponse {
  message: string;
}

export const healthApiService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // @ts-ignore
    getStatus: builder.query<ServerResponse, void>({
      query: () => 'status',
    }),
  }),
});
