import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageOptimizationResultItem, Loading, ScrollArea } from '@/app/components';
import { useSelector } from 'react-redux';
import { getImageOptimizationResult } from '@/app/redux/features';

type Props = {
  isLoading: boolean;
}

export const ImageOptimizationResultList = ({ isLoading }: Props) => {
  const imageOptimizationResult = useSelector(getImageOptimizationResult);

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center items-center min-h-[488px]">
        <Loading />
      </div>
    )
  }

  return (
    <AnimatePresence>
      <ScrollArea className="h-[488px]">
        {imageOptimizationResult.map((item, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.3, delay: index * 0.1}}
            >
              <ImageOptimizationResultItem item={item} />
            </motion.div>
          )
        )}
      </ScrollArea>
    </AnimatePresence>
  )
}