import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MAX_COLOR_HISTORY_LENGTH } from '@/app/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatePercentageDifference = (
  value1: number,
  value2: number,
): string => {
  const difference = value1 - value2;
  const percentageDifference = (difference / value1) * 100;

  return percentageDifference.toFixed();
};

export const debounce = <T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number,
) => {
  let timer: number;

  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
};

export const validateAndFormatHexColor = (color: string): string | null => {
  const hexColorRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  if (!hexColorRegex.test(color)) {
    return null;
  }

  if (color[0] !== '#') {
    return `#${color}`;
  }

  return color;
};

export const updateColorHistory = (
  colorHistory: string[],
  newColor: string,
  replaceIndex: number,
): [string[], number] => {
  if (colorHistory.includes(newColor)) {
    return [colorHistory, replaceIndex]; // No update if the color is already present
  }

  if (colorHistory.length < MAX_COLOR_HISTORY_LENGTH) {
    // Add the new color to the end of the array
    return [[...colorHistory, newColor], replaceIndex];
  }

  // Replace the color at the current replace index
  const updatedColorHistory = [...colorHistory];
  updatedColorHistory[replaceIndex] = newColor;

  // Update the replace index
  const newReplaceIndex = (replaceIndex + 1) % MAX_COLOR_HISTORY_LENGTH;

  return [updatedColorHistory, newReplaceIndex];
};
