import { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast, } from 'sonner';

type ActionType = {
  payload: {
    data: {
      message: string,
      statusCode: number,
      path: string
    }
  }
}

export const errorHandlingMiddleware: Middleware = () => (next) => (action: ActionType) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.data?.path.includes('getAccount')) {
      return next(action);
    }

    // Handle error regarding credits inside the component
    if (action?.payload?.data?.statusCode === 406) {
      return next(action);
    }

    toast.warning('Error', {
      description: action?.payload?.data?.message
    });
  }

  return next(action);
};
