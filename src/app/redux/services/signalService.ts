import { createBaseApi } from '@/app/redux/api';

export const SIGNAL_SERVICE_REDUCER_KEY = 'signalService';

const baseApi = createBaseApi(SIGNAL_SERVICE_REDUCER_KEY);

interface NotifyBody {
  message: string;
}

export const signalService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    notify: builder.mutation({
      query: (body: NotifyBody) => ({
        url: '/signal/notify',
        method: 'POST',
        body: body
      })
    })
  })
})

export const { useNotifyMutation } = signalService;
