import { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export const errorHandlingMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error('Caught an error:', action.payload);

    // Optionally dispatch an error notification action or handle the error as needed
    dispatch({ type: 'error/handle', payload: action.payload });
  }

  return next(action);
};
