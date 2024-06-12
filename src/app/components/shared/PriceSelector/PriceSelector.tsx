import React from 'react';

import { Coins } from 'lucide-react';

import { AnimatedPage, Loading, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components';
import { usePriceList } from '@/app/hooks/usePriceList';

export const PriceSelector = () => {
  const { isLoading, princeList } = usePriceList();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading/>
      </div>
    )
  }

  return (
    <AnimatedPage>
      <div className="flex flex-col w-full">
        {princeList.map((variant, index) => (
          <div key={index}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="p-0 h-fit w-full">
                  <div className="flex flex-row cursor-pointer justify-between bg-midnight-slate rounded-lg p-3 mb-3"
                       onClick={() => window.open(variant.link, '_blank')}>
                    <div className="flex items-center align-baseline gap-1.5">
                      <Coins size={25} className="fill-amber-400 stroke-amber-600"/>
                      <p className="text-lg">{variant.credits} Credits</p>
                    </div>
                    <div className="text-gray-400 text-lg">${variant.price}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="flex">{variant.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </AnimatedPage>
  )
};