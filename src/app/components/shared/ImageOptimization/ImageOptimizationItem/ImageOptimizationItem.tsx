import React, { memo } from 'react';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';

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
    <div className="flex items-center gap-5 py-2.5">
      <div>check</div>
      <div className="flex max-w-[48px] max-h-[48px] justify-center items-center preview">
        <img src={imageUrl} alt={name} className="rounded-md w-full h-full" />
      </div>
      <div className="flex">
        {name}
      </div>
      <div className="flex">
        {width}x{height}
      </div>
    </div>
  )
})
