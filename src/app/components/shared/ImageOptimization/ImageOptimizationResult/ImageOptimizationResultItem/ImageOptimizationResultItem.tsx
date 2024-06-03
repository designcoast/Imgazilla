import React, { useMemo } from 'react';
import { calculatePercentageDifference, cn } from '@/app/lib/utils';
import { FORMAT_TO_MIME_TYPE } from '@/app/constants';

type Props = {
  item: ImageOptimizationResult
}

export const ImageOptimizationResultItem = ({ item }: Props) => {
  const { name, sourceImageSize, format, optimizedImageSize } = item;

  const optimizationPercentage = useMemo(() =>
    calculatePercentageDifference(sourceImageSize, optimizedImageSize),
    [sourceImageSize, optimizedImageSize]
  );

  return (
    <div className={cn('flex flex-col border-b')}>
      <div className="flex items-center justify-between gap-5 py-2.5 space-x-4 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 flex items-center justify-center overflow-hidden preview rounded-md">
            <img
              src={`data:${FORMAT_TO_MIME_TYPE[format.toUpperCase()]};base64,${item.base64Image}`}
              alt={name}
              className="rounded-md min-w-full min-h-full object-cover"
            />
          </div>
          <div className='flex w-64'>
            <p className="truncate">{name}</p>
          </div>
        </div>
        <div className='flex text-sm gap-0.5'>
          <p>{sourceImageSize.toFixed(2)}</p>
          <p>KB</p>
        </div>
        <div className='flex font-bold text-sm gap-0.5'>
          <p>{optimizedImageSize.toFixed(2)}</p>
          <p>KB</p>
        </div>
        <div className='flex'>
          <p className="text-green-700 text-sm">{optimizationPercentage}%</p>
        </div>
      </div>
    </div>
  )
}