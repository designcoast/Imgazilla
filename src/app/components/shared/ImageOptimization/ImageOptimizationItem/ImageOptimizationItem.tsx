import React, { memo } from 'react';
// import { convertToImageUrl } from '@/app/lib/convertToImageUrl';

type Props = {
  item: ImageInfo
}

export const ImageOptimizationItem = memo(({ item }: Props) => {
  console.log('item', item);
  return (
    <div className="flex">item 2</div>
  )
})

// const img = convertToImageUrl(item);
//<img key={index} src={img} alt={`alt-${index}`}/>