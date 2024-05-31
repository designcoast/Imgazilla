import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export const calculatePercentageDifference = (value1: number, value2: number): string => {
  const difference = value1 - value2;
  const percentageDifference = (difference / value1) * 100;

  return percentageDifference.toFixed();
};

export const useSameUUIDs = (source: ImageInfo[], result: ImageOptimizationResult[]): boolean => {
  const uuidsSet = new Set(result.map(item => item.uuid));
  return source.every(item => uuidsSet.has(item.uuid));
};
