import React from 'react';
import { useSelector } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';

import { getImages } from '@/app/redux/features';
import { ImageOptimizationItem, ScrollArea } from '@/app/components';

type Props = {
  isLoading: boolean;
}

export const ImageOptimizationList = ({ isLoading }: Props) => {
  const images = useSelector(getImages);

  if (!isLoading && images.length === 0) {
    return (
      <div className="h-[425px] px-10 text-center text-sm font-bold flex justify-center items-center">
        No images available for export. Please select images in your Figma project and add export settings.
      </div>
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