import React from 'react';
import { CircleChevronLeft } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components';

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
}

export const ImageOptimizationResultSettings = ({ onClick, isDisabled = false }: Props) => {
  return (
    <div className="flex justify-end border-b pb-2">
      <div className="mx-4 mb-2 mt-1.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={onClick} disabled={isDisabled} type="button">
              <CircleChevronLeft size={20} />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Back to images list</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
