import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, CircleHelp } from 'lucide-react';

import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import {
  Button,
  Checkbox,
  ImageOptimizationLevel,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/app/components';

import {
  removeSelectedImages,
  setSelectedImages,
  updateImageOptimizationPercent
} from '@/app/redux/features';
import { useTypedDispatch } from '@/app/redux/store';

import { cn } from '@/app/lib/utils';
import { calculateSize } from '@/app/lib/calculateSize';
import { PDF_FORMAT, SVG_FORMAT } from '@/app/constants';

type Props = {
  item: ImageInfo;
};

export const ImageOptimizationItem = memo(({ item }: Props) => {
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
  const exportableImageSize = useMemo(() => calculateSize({
    width,
    height,
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

  useEffect(() => {
    if (isSelected || !isOpen) {
      return;
    }

    setIsOpen(false)

  }, [isSelected, isOpen]);

  const isNotSupportedFormat = format === PDF_FORMAT || format === SVG_FORMAT;

  const isDisabled = !isSelected;

  const isShowExportableSize = setting?.constraint?.value && setting?.constraint?.value !== 1;

  const isShowSettings = setting.suffix || isShowExportableSize;

  const disabledStyles = isDisabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <div className={cn('flex flex-col border-b', isOpen ? 'bg-primary-grayCard' : '')}>
      <div className="flex items-center justify-between gap-5 py-2.5 space-x-4 px-4">
        <div className="flex items-center space-x-3">
          <Checkbox onClick={handleOnCheck} checked={isSelected}/>
          <div className={cn(disabledStyles)}>
            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center overflow-hidden preview rounded-md">
              {format === PDF_FORMAT ? (
                <iframe src={imageUrl} width="100%" height="100%" className="rounded-md min-w-full min-h-full object-cover"/>
              ) : (
                <img src={imageUrl} alt={name} className="rounded-md min-w-full min-h-full object-cover"/>
              )}
            </div>
          </div>
          <div className={cn('flex w-56 text-xs', disabledStyles)}>
            <p className="truncate">{name}</p>
          </div>
        </div>
        <div className={cn('flex text-xs', disabledStyles)}>
          {format}
        </div>
        <div className={cn('flex gap-1.5 text-xs', disabledStyles)}>
          <div className="flex">
            {width}x{height}
          </div>
          {isShowSettings ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="p-0 h-fit">
                  <CircleHelp size={16} />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="flex flex-col gap-1.5">
                    {(isShowExportableSize) ? (
                      <div className="flex gap-1.5 justify-center align-baseline">
                        <p className="text-xs">Exportable size:</p>
                        <p className="text-xs">{exportableImageSize}</p>
                      </div>
                    ) : null}
                    {setting?.suffix ? (
                      <div className="flex gap-1.5">
                        <p className="text-xs">Suffix:</p>
                        <p className="text-xs">{setting?.suffix}</p>
                      </div>
                    ): null}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : <div className="h-4 w-4" />}
        </div>
        <div className={cn(disabledStyles)}>
          {isNotSupportedFormat ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="px-4 h-fit opacity-50 cursor-not-allowed" disabled={true}>
                  <ChevronDown size={20}/>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <span>Optimization settings are currently not supported.</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button variant="ghost" onClick={handleOnOpen} disabled={isDisabled}>
              {isOpen ? (
                <ChevronUp size={20}/>
              ) : (
                <ChevronDown size={20}/>
              )}
            </Button>
          )}
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
