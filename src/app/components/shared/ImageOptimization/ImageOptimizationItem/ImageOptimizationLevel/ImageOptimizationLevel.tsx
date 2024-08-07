import React, { memo, useCallback, useEffect, useState } from 'react';
import { Slider, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components';

import { QUALITY_PERCENTAGE_STEP } from '@/app/constants';

type Props = {
  optimizationPercent: number;
  handleOnOptimizationLevel: (value: number[]) => void;
};

export const ImageOptimizationLevel = memo(({ optimizationPercent, handleOnOptimizationLevel }: Props) => {
  const [optimizationLevel, setOptimizationLevel] = useState(100);

  const onChange = useCallback((value: number[]) => {
    const percent = value[0];

    setOptimizationLevel(percent);
    handleOnOptimizationLevel(value);
  }, []);

  useEffect(() => {
    setOptimizationLevel(optimizationPercent);
  }, [optimizationPercent]);

  return (
    <div className="flex flex-row gap-3">
      <Slider
        max={100}
        min={0}
        step={QUALITY_PERCENTAGE_STEP}
        defaultValue={[optimizationPercent]}
        value={[optimizationLevel]}
        onValueChange={onChange}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="p-0 h-fit">
            <div
              className="flex bg-primary-secondDark border border-primary-primaryDark rounded-sm text-primary-gray px-3 py-0.5 font-semibold text-xs min-w-[58px] justify-center">{optimizationLevel}%
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs">Optimization level for this image.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </div>
  )
});
