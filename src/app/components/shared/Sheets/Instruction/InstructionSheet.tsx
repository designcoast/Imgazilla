import React, { useCallback } from 'react';

import {
  Button,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components';
import { ANALYTIC_EVENTS } from '@/app/constants';
import { useMixpanel } from '@/app/hooks/useMixpanleAnalytics';

const IMAGE_CREDITS_COST = process.env.IMAGE_CREDITS_COST;
const FAVICON_ARCHIVE_CREDITS_COST = process.env.FAVICON_ARCHIVE_CREDITS_COST;

export const InstructionSheet = () => {
  const trackClick = useMixpanel();

  const handleOnClick = useCallback(() => {
    trackClick('click', {
      name: ANALYTIC_EVENTS.OPEN_INSTRUCTION,
    });
  }, [trackClick]);

  return (
    <Sheet>
      <SheetTrigger asChild onClick={handleOnClick}>
        <Button
          variant='ghost'
          className='w-full justify-start hover:bg-primary-lightGreen hover:text-primary-mainDark'
        >
          Instructions
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className='w-[80%]'>
          <SheetTitle className='text-left text-sm'>
            Welcome to the Favicon Exporter and Image Optimiser Plugin!
          </SheetTitle>
        </SheetHeader>
        <div className='mt-4'>
          <ScrollArea className='h-[404px]'>
            <div className='grid gap-4'>
              <p className='font-medium text-sm'>Exporting Favicons:</p>
              <ul className='flex flex-col gap-3'>
                <li className='text-sm'>
                  1. Select the image you want to use for your favicon.
                </li>
                <li className='text-sm'>2. Click on the "Export" button.</li>
                <li className='text-sm'>
                  3. Each export of a favicon archive will cost you{' '}
                  {FAVICON_ARCHIVE_CREDITS_COST} credits.
                </li>
              </ul>
            </div>
            <div className='grid gap-4 pt-4'>
              <p className='font-medium text-sm'>Image Optimization:</p>
              <ul className='flex flex-col gap-3'>
                <li className='text-sm'>
                  1. Click on the "Image optimization" tab.
                </li>
                <li className='text-sm'>
                  2. Each archive will cost you {IMAGE_CREDITS_COST} credits.{' '}
                  <span className='inline-block font-bold text-sm ml-0.5 mt-1'>
                    (Without limiting the number of images in each archive).{' '}
                  </span>
                </li>
              </ul>
            </div>
            <div className='grid gap-4 pt-4'>
              <p className='font-medium text-sm'>Credit Management:</p>
              <ul className='flex flex-col gap-3'>
                <li className='text-sm flex'>
                  1. Check your current credit balance in the top-right corner.
                </li>
                <li className='text-sm flex'>
                  2. Monitor your usage and balance to ensure smooth usage of
                  the plugin.
                </li>
                <li className='text-sm flex'>3. Credits stack.</li>
              </ul>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
