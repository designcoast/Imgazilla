import React, { memo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import { Button, Checkbox } from '@/app/components';

type Props = {
  item: ImageInfo;
  onCheck: (item: ImageInfo) => void;
}

export const ImageOptimizationItem = memo(({ onCheck, item }: Props) => {
  const {
    name,
    width,
    height,
    uintArray
  } = item;

  const imageUrl = convertToImageUrl(uintArray);

  const handleOnCheck = useCallback(() => {
    onCheck(item);
  }, [item])

  return (
    <div className="flex items-center justify-between gap-5 py-2.5 space-x-4 px-4">
      <div className="flex items-center space-x-3">
        <Checkbox onClick={handleOnCheck} />
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
        <Button variant="ghost">
          <ChevronDown />
        </Button>
      </div>
    </div>
  )
})
