import React from 'react';
import { useSelector } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';

import { getImages, getIsLoading } from '@/app/redux/features';
import { ImageOptimizationItem, Loading, ScrollArea } from '@/app/components';

export const ImageOptimizationList = () => {
  const images = useSelector(getImages);
  const isLoading = useSelector(getIsLoading);

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center items-center min-h-[488px]">
        <Loading />
      </div>
    )
  }

  if (!isLoading && images.length === 0) {
    return (
      <div className="flex">Empty</div>
    )
  }

  return (
    <AnimatePresence>
      <ScrollArea className="h-[425px]">
        {images.map((item, index) => (
            <motion.div
              key={item.uuid}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.3, delay: index * 0.1}}
            >
              <ImageOptimizationItem item={item} />
            </motion.div>
          )
        )}
      </ScrollArea>
    </AnimatePresence>
  )
}