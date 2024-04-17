import { useCallback, useEffect, useRef } from 'react';

/**
 * useDelay hook allows you to delay execution of a callback function.
 *
 * @param callback - Function to be delayed.
 * @param delay - Delay in milliseconds before the callback is executed.
 */
export const useDelay = (callback: () => void, delay: number): () => void => {
  // Using a ref to store the callback ensures that the latest callback is used without re-setting the timer.
  const callbackRef = useRef(callback);

  // Update the callback ref each time the function changes.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up a timeout to execute the callback after the delay.
  return useCallback(() => {
    const timer = setTimeout(() => {
      callbackRef.current();
    }, delay);

    // Clean up the timer when the delay or component unmounts.
    return () => clearTimeout(timer);
  }, [delay]);
}