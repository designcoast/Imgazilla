import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ImageOptimizationItem, MainContainer, ScrollArea } from '@/app/components';

type Props = {
  isLoading: boolean;
  data: ImageInfo[];
}

export const ImageOptimizationList = ({ isLoading, data }: Props) => {
  if (!isLoading && data.length === 0) {
    return (
      <MainContainer className="mt-0.5 overflow-hidden h-full max-h-[444px]">
        <div className="flex flex-col m-auto text-center text-sm justify-center items-center gap-3">
          <p className="font-semibold ">No images available for export.</p>
          <p>Please select images in your Figma project and add export settings.</p>
        </div>
      </MainContainer>
    )
  }

  return (
    <MainContainer className="mt-0.5 overflow-hidden h-full max-h-[444px]">
      <AnimatePresence>
        <ScrollArea className="w-full">
          {data.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === data.length - 1;
            const classes = `${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''}`;

            return (
              <motion.div
                key={item.uuid}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.3, delay: index * 0.1}}
              >
                <ImageOptimizationItem item={item} className={classes} />
              </motion.div>
            )}
          )}
        </ScrollArea>
      </AnimatePresence>
    </MainContainer>
  )
}