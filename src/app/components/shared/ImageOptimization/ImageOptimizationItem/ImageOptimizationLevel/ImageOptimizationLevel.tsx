import React, { memo } from 'react';
import { Slider } from '@/app/components';

type Props = {
  optimizationPercent: number;
  handleOnOptimizationLevel: (value: number[]) => void;
};

export const ImageOptimizationLevel = memo(({ optimizationPercent, handleOnOptimizationLevel }: Props) => {
  return (
    <div className="flex">
      <Slider defaultValue={[optimizationPercent]} max={100} min={0} step={25} onValueChange={handleOnOptimizationLevel}/>
    </div>
  )
});
