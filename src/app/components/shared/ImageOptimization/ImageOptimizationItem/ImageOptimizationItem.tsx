import React, { memo, useCallback, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import { Button, Checkbox, ImageOptimizationLevel } from '@/app/components';

import {
  removeSelectedImages,
  setSelectedImages,
  updateImageOptimizationPercent
} from '@/app/redux/features';
import { useTypedDispatch } from '@/app/redux/store';

import { cn } from '@/app/lib/utils';

type Props = {
  item: ImageInfo;
}

export const ImageOptimizationItem = memo(({ item }: Props) => {
  const {
    uuid,
    name,
    width,
    height,
    uintArray,
    optimizationPercent,
    isSelected,
  } = item;

  const [isOpen, setIsOpen] = useState(false);

  const imageUrl = useMemo(() => convertToImageUrl(uintArray), [uintArray]);

  const dispatch = useTypedDispatch();

  const handleOnCheck = useCallback(() => {
    if (isSelected) {
      dispatch(removeSelectedImages({
        uuid,
      }));
      return;
    }
    dispatch(setSelectedImages({
      uuid,
    }))
  }, [uuid, isSelected]);


  const handleOnOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleOnOptimizationLevel = useCallback((value: number[]) => {
    const percent = value[0];
    dispatch(updateImageOptimizationPercent({
      uuid,
      percent,
    }));
  }, []);

  const isDisabled = !isSelected;

  const disabledStyles = isDisabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <div className={cn('flex flex-col border-b', isOpen ? 'bg-primary-grayCard' : '')}>
      <div className="flex items-center justify-between gap-5 py-2.5 space-x-4 px-4">
        <div className="flex items-center space-x-3">
          <Checkbox onClick={handleOnCheck} checked={isSelected} />
          <div className={cn(disabledStyles)}>
            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center overflow-hidden preview rounded-md">
              <img src={imageUrl} alt={name} className="rounded-md min-w-full min-h-full object-cover"/>
            </div>
          </div>
          <div className={cn('flex w-64', disabledStyles)}>
            <p className="truncate">{name}</p>
          </div>
        </div>
        <div className={cn('flex', disabledStyles)}>
          {width}x{height}
        </div>
        <div className={cn(disabledStyles)}>
          <Button variant="ghost" onClick={handleOnOpen} disabled={isDisabled}>
            {isOpen ? (
              <ChevronUp />
              ) : (
              <ChevronDown/>
            )}
          </Button>
        </div>
      </div>
      {isOpen ? (
        <ImageOptimizationLevel
          optimizationPercent={optimizationPercent}
          handleOnOptimizationLevel={handleOnOptimizationLevel}
        />
      ) : null}
    </div>
  )
})
