import React, { useCallback, useState } from 'react';
import { Button, Slider } from '@/app/components';

const CREDIT_MULTIPLIER = process.env.CREDIT_MULTIPLIER;

export const PriceSelector = () => {
  const [price, setPrice] = useState(1);
  const [credits, setCredits] = useState(10);

  const handlePriceChange = useCallback((value: number[]) => {
    const price = value[0];
    const creditsCalculate = price * parseInt(CREDIT_MULTIPLIER);

    setPrice(price);
    setCredits(creditsCalculate);
  }, []);

  return (
    <div className="flex flex-col bg-midnight-slate rounded-lg p-6">
      <div className="flex flex-col items-center justify-center">
        <div className="flex font-bold text-4xl">$ {price}</div>
        <div className="flex">
          <div className="flex gap-1 justify-center items-baseline text-primary my-3">
            <p className="font-medium text-lg">+ {credits} / </p>
            <p className="text-xs">credits</p>
          </div>
        </div>
      </div>
      <div className="mb-4 mt-2">
        <Slider defaultValue={[price]} max={100} min={1} step={1} onValueChange={handlePriceChange}/>
      </div>
      <Button>Add credits</Button>
    </div>
  )
};