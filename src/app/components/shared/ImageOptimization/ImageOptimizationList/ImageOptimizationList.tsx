import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';

import { getImages, getSelectedImages } from '@/app/redux/features';
import { ImageOptimizationItem, Loading } from '@/app/components';
import { useTypedDispatch } from '@/app/redux/store';

export const ImageOptimizationList = () => {

  const { images, isLoading } = useSelector(getImages);
  const selectedImages = useSelector(getSelectedImages);

  const dispatch = useTypedDispatch();

  const handleOnCheck = useCallback((item: ImageInfo) => {

    console.log('selectedImages', selectedImages);

    console.log('item', item);
  }, [selectedImages]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    <AnimatePresence>
      {images.map((item, index) => (
        <motion.div
          key={item.uuid}
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -20}}
          transition={{duration: 0.3, delay: index * 0.1}}
        >
          <ImageOptimizationItem item={item} onCheck={handleOnCheck} />
        </motion.div>
      )
    )}
    </AnimatePresence>
  )
}