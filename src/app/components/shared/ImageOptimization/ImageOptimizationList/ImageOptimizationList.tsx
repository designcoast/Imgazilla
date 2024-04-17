import React from 'react';
import { useSelector } from 'react-redux';
import { getImages } from '@/app/redux/features';
import { ImageOptimizationItem, Loading } from '@/app/components';

export const ImageOptimizationList = () => {

  const { images, isLoading } = useSelector(getImages);

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    images.map((item, index) => <ImageOptimizationItem key={index} item={item} />)
  )
}