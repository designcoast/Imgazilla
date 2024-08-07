import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RefreshCcw } from 'lucide-react';

import { toNumber } from 'lodash';

import {
  getImages,
  getSelectedImagesCount, selectAllImages, unselectAllImages, updateAllImageOptimizationPercent,
  updateGeneralOptimizationPercent
} from '@/app/redux/features';

import {
  Checkbox,
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/app/components';
import { useTypedDispatch } from '@/app/redux/store';
import { TITLE_TO_QUALITY_PERCENTAGE } from '@/app/constants';

type Props = {
  onRefresh: () => void;
};

export const ImageOptimizationSettings = ({ onRefresh }: Props) => {
  const images = useSelector(getImages);
  const selectedImagesCount = useSelector(getSelectedImagesCount);

  const isSelectedAll = useMemo(() => images.every((image) => image.isSelected), [images]);

  const dispatch = useTypedDispatch();

  const handleOnCheck = useCallback(() => {
    const isSelectedAll = images.every((image) => image.isSelected);
    const isSelectedSome = images.some((image) => image.isSelected);

    if (isSelectedAll || isSelectedSome) {
      dispatch(unselectAllImages());
      return;
    }

    dispatch(selectAllImages());

  }, [images]);

  const handleOnOptimizationLevel = useCallback((value: string) => {
    dispatch(updateGeneralOptimizationPercent(toNumber(value)));
    dispatch(updateAllImageOptimizationPercent(toNumber(value)));
  }, []);

  return (
    <>
      <div className="border border-primary-primaryDark bg-primary-secondDark rounded-lg">
        <div className="flex justify-between mx-3 my-3">
          <div className="flex justify-center items-center">
            <div className="mr-3">
              <Checkbox
                checked={isSelectedAll}
                onClick={handleOnCheck}
              />
            </div>
            <div className="flex mr-1 text-xs font-semibold">{selectedImagesCount}/{images.length}</div>
            <div className="flex text-xs font-semibold">Images selected</div>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <Select onValueChange={handleOnOptimizationLevel}>
                <SelectTrigger className="mr-2 w-[146px]">
                  <SelectValue placeholder="Images quality" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TITLE_TO_QUALITY_PERCENTAGE).map((item) => (
                    <SelectItem key={item} value={item}>{TITLE_TO_QUALITY_PERCENTAGE[item]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="p-0 h-fit" onClick={onRefresh}>
                    <RefreshCcw size={16} className="stroke-borderSquare"/>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-xs">Refresh and retrieve the latest images from the Page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
