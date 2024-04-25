import React, { memo, useMemo } from 'react';
import { Slider } from '@/app/components';

import { TITLE_TO_QUALITY_PERCENTAGE } from '@/app/constants';

type Props = {
  optimizationPercent: number;
  handleOnOptimizationLevel: (value: number[]) => void;
};

export const ImageOptimizationLevel = memo(({ optimizationPercent, handleOnOptimizationLevel }: Props) => {

  const optimizationTitle = useMemo(() => TITLE_TO_QUALITY_PERCENTAGE[optimizationPercent], [optimizationPercent]);

  return (
    <div className="border-t">
      <div className="flex flex-col mx-4 my-3.5">
        <div className="flex justify-between mb-2.5">
          <div className="text-xs font-semibold">Image Quality (All)</div>
          <div className="flex items-baseline">
            <p className="text-sm font-bold mr-1">{optimizationPercent}</p>
            <p className="text-xs">%</p>
            <p className="text-xs ml-1">({optimizationTitle})</p>
          </div>
        </div>
        <Slider
          max={100}
          min={0}
          step={25}
          defaultValue={[optimizationPercent]}
          onValueChange={handleOnOptimizationLevel}
        />
      </div>

    </div>
  )
});
