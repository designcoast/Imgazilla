import React from 'react';
import { useSelector } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.ul layout>
      <AnimatePresence>
        {images.map(item => (
          <motion.li
            key={item.uuid}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <ImageOptimizationItem item={item}/>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
)
}