import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RefreshCcw, SquareDashedMousePointer, StickyNote } from 'lucide-react';

import { toNumber } from 'lodash';

import {
  getImages,
  getSelectedImagesCount,
  selectAllImages,
  unselectAllImages,
  updateAllImageOptimizationPercent,
  updateGeneralOptimizationPercent,
} from '@/app/redux/features';

import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components';
import { useTypedDispatch } from '@/app/redux/store';
import { TITLE_TO_QUALITY_PERCENTAGE } from '@/app/constants';

type Props = {
  onRefreshPage: () => void;
  onRefreshSelectedNode: () => void;
};

export const ImageOptimizationSettings = ({
  onRefreshPage,
  onRefreshSelectedNode,
}: Props) => {
  const images = useSelector(getImages);
  const selectedImagesCount = useSelector(getSelectedImagesCount);

  const isSelectedAll = useMemo(
    () => images.every((image) => image.isSelected),
    [images],
  );

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
      <div className='border border-primary-primaryDark bg-primary-secondDark rounded-lg'>
        <div className='flex justify-between mx-3 my-3'>
          <div className='flex justify-center items-center'>
            <div className='mr-3'>
              <Checkbox checked={isSelectedAll} onClick={handleOnCheck} />
            </div>
            <div className='flex mr-1 text-xs font-semibold'>
              {selectedImagesCount}/{images.length}
            </div>
            <div className='flex text-xs font-semibold'>Images selected</div>
          </div>
          <div className='flex items-center'>
            <div className='mr-3'>
              <Select onValueChange={handleOnOptimizationLevel}>
                <SelectTrigger className='w-[146px]'>
                  <SelectValue placeholder='Images quality' />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TITLE_TO_QUALITY_PERCENTAGE).map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className='text-primary-lightGray focus:bg-primary-lightGreen focus:text-primary-secondDark'
                    >
                      {TITLE_TO_QUALITY_PERCENTAGE[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex flex-row justify-center items-center gap-2.5 rounded-lg border border-primary-primaryDark bg-primary-mainDark px-3 py-2.5 text-sm'>
                  <p>Sync</p>
                  <RefreshCcw size={16} className='stroke-borderSquare' />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={6}
                  align='end'
                  className='w-auto flex flex-col rounded-lg border border-primary-primaryDark bg-primary-mainDark px-3 py-2.5 text-sm'
                >
                  <DropdownMenuItem
                    className='gap-2.5 text-primary-lightGray focus:bg-primary-lightGreen focus:text-primary-secondDark cursor-pointer'
                    onClick={onRefreshSelectedNode}
                  >
                    <SquareDashedMousePointer
                      size={20}
                      className='stroke-borderSquare'
                    />
                    <p className='text-inherit'>Selected</p>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='bg-primary-primaryDark' />
                  <DropdownMenuItem
                    className='gap-2.5 text-primary-lightGray focus:bg-primary-lightGreen focus:text-primary-secondDark cursor-pointer'
                    onClick={onRefreshPage}
                  >
                    <StickyNote size={20} className='stroke-borderSquare' />
                    <p className='text-inherit'>Full page</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
