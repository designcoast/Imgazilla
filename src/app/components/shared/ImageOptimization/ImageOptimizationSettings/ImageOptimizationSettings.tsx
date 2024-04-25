import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getGeneralOptimizationPercent,
  getImages,
  getSelectedImagesCount, selectAllImages, unselectAllImages,
  updateGeneralOptimizationPercent
} from '@/app/redux/features';
import { Button, Checkbox, Slider } from '@/app/components';
import { RefreshCcw } from 'lucide-react';
import { useTypedDispatch } from '@/app/redux/store';
import { TITLE_TO_QUALITY_PERCENTAGE } from '@/app/constants';

type Props = {
  onRefresh: () => void;
};

export const ImageOptimizationSettings = ({ onRefresh }: Props) => {
  const images = useSelector(getImages);
  const selectedImagesCount = useSelector(getSelectedImagesCount);
  const generalOptimizationPercent = useSelector(getGeneralOptimizationPercent);

  const optimizationTitle = useMemo(() => TITLE_TO_QUALITY_PERCENTAGE[generalOptimizationPercent], [generalOptimizationPercent]);

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

  const handleOnOptimizationLevel = useCallback((value: number[]) => {
    const percent = value[0];
    dispatch(updateGeneralOptimizationPercent(percent));
  }, []);

  return (
    <>
      <div className="border-b">
        <div className="flex justify-between mx-4 my-3.5 mt-1.5">
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
          <div className="flex">
            <Button variant='ghost' className="p-0 h-fit" onClick={onRefresh}>
              <RefreshCcw size={20} />
            </Button>
          </div>
        </div>
      </div>
      <div className="border-b">
        <div className="flex flex-col mx-4 my-3.5">
          <div className="flex justify-between mb-2.5">
            <div className="text-xs font-semibold">Image Quality (All)</div>
            <div className="flex items-baseline">
              <p className="text-sm font-bold mr-1">{generalOptimizationPercent}</p>
              <p className="text-xs">%</p>
              <p className="text-xs ml-1">({optimizationTitle})</p>
            </div>
          </div>
          <Slider
            max={100}
            min={0}
            step={25}
            defaultValue={[generalOptimizationPercent]}
            onValueChange={handleOnOptimizationLevel}/>
        </div>
      </div>
    </>
  )
}
