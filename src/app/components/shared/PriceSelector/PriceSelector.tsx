import React from 'react';
import { AnimatedPage, Button, Loading } from '@/app/components';
import { usePriceList } from '@/app/hooks/usePriceList';

const CREDITS = process.env.CREDITS;

export const PriceSelector = () => {
  const { isLoading, princeList } = usePriceList();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    <AnimatedPage>
      {princeList.map((variant, index) => (
        <div key={index} className="flex flex-col bg-midnight-slate rounded-lg p-6">
          <div className="flex flex-col items-center justify-center">
            <div className="flex font-bold text-4xl">{variant.price}</div>
            <div className="flex">
              <div className="flex gap-1 justify-center items-baseline text-primary my-3">
                <p className="font-medium text-lg">+ {CREDITS} / </p>
                <p className="text-xs">credits</p>
              </div>
            </div>
          </div>
          <Button onClick={() => window.open(variant.link, '_blank')}>Add credits</Button>
        </div>
      ))}
    </AnimatedPage>
  )
};