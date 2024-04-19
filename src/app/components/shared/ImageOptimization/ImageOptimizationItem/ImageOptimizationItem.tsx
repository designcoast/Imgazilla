import React, { memo } from 'react';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import { Button, Checkbox } from '@/app/components';

type Props = {
  item: ImageInfo
}

export const ImageOptimizationItem = memo(({ item: {
  name,
  width,
  height,
  uintArray
} }: Props) => {
  const imageUrl = convertToImageUrl(uintArray);
  return (
    <div className="flex items-center justify-between gap-5 py-2.5 space-x-4 px-4">
      <div className="flex items-center space-x-3">
        <Checkbox />
        <div>
          <div className="w-12 h-12 bg-gray-200 flex items-center justify-center overflow-hidden preview rounded-md">
            <img src={imageUrl} alt={name} className="rounded-md min-w-full min-h-full object-cover"/>
          </div>
        </div>
        <div className="flex w-64">
          <p className="truncate">{name}</p>
        </div>
      </div>
      <div className="flex">
        {width}x{height}
      </div>
      <div>
        <Button>Open</Button>
      </div>
    </div>
  )
})
//