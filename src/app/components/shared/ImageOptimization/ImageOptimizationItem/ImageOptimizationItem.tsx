import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import {
  Checkbox, FormatBadge,
  ImageOptimizationLevel,
} from '@/app/components';

import {
  removeSelectedImages,
  setSelectedImages,
  updateImageOptimizationPercent
} from '@/app/redux/features';
import { useTypedDispatch } from '@/app/redux/store';

import { cn } from '@/app/lib/utils';
import { scaleFormat } from '@/app/lib/calculateSize';
import { PDF_FORMAT } from '@/app/constants';

type Props = {
  item: ImageInfo;
  className?: string;
};

export const ImageOptimizationItem = memo(({ item, className }: Props) => {
  const {
    uuid,
    name,
    width,
    height,
    uintArray,
    format,
    optimizationPercent,
    isSelected,
    setting
  } = item;

  const [isOpen, setIsOpen] = useState(false);

  const imageUrl = useMemo(() => convertToImageUrl(uintArray, format), [uintArray, format]);
  const exportableImageScale = useMemo(() => scaleFormat({
    type: setting?.constraint?.type,
    value: setting?.constraint?.value,
  }), [width, height, format, setting]);

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

  const handleOnOptimizationLevel = useCallback((value: number[]) => {
    const percent = value[0];
    dispatch(updateImageOptimizationPercent({
      uuid,
      percent,
    }));
  }, []);

  useEffect(() => {
    if (isSelected || !isOpen) {
      return;
    }

    setIsOpen(false)

  }, [isSelected, isOpen]);

  const isDisabled = !isSelected;

  const disabledStyles = isDisabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <div className={cn("flex flex-col border bg-primary-mainDark border-primary-primaryDark w-full", className)}>
      <div className="flex items-center justify-between gap-5 py-2.5 space-x-4 px-4 w-full">
        <div className="flex items-center space-x-3">
          <Checkbox onClick={handleOnCheck} checked={isSelected}/>
          <div className={cn(disabledStyles)}>
            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center overflow-hidden preview rounded-md">
              {format === PDF_FORMAT ? (
                <iframe src={imageUrl} width="100%" height="100%"
                        className="rounded-md min-w-full min-h-full object-cover"/>
              ) : (
                <img src={imageUrl} alt={name} className="rounded-md min-w-full min-h-full object-cover"/>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className={cn('flex w-56 text-xs mb-3', disabledStyles)}>
              <p className="truncate">{setting?.suffix ? `${setting?.suffix}_${name}` : name}</p>
            </div>
            <ImageOptimizationLevel
              optimizationPercent={optimizationPercent}
              handleOnOptimizationLevel={handleOnOptimizationLevel}
            />
          </div>
        </div>
        <div className={cn('flex gap-1.5 text-xs', disabledStyles)}>
          <div className="flex">
            {exportableImageScale}
          </div>
        </div>
        <div className={cn('flex gap-1.5 text-xs min-w-[70px]', disabledStyles)}>
          <div className="flex">
            {width}x{height}
          </div>
        </div>
        <div className={cn('flex text-xs', disabledStyles)}>
          <FormatBadge format={format}>
            {format}
          </FormatBadge>
        </div>
      </div>
    </div>
  )
})
