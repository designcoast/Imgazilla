import { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast, } from 'sonner';

export const errorHandlingMiddleware: Middleware = () => (next) => (action: { payload: { data: { message: string } }}) => {
  if (isRejectedWithValue(action)) {
    toast.warning('Error', {
      description: action.payload.data.message
    });
  }

  return next(action);
};
