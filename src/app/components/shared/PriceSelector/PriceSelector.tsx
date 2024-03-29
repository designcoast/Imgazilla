import React from 'react';
import { Button } from '@/app/components';

const CREDIT_PRICE = process.env.CREDIT_PRICE;
const CREDITS = process.env.CREDITS;

export const PriceSelector = () => {
  // const [price, setPrice] = useState(5);
  // const [credits, setCredits] = useState(600);

  // const handlePriceChange = useCallback((value: number[]) => {
  //   const price = value[0];
  //   const creditsCalculate = price * parseInt(CREDIT_MULTIPLIER);
  //
  //   setPrice(price);
  //   setCredits(creditsCalculate);
  // }, []);

  return (
    <div className="flex flex-col bg-midnight-slate rounded-lg p-6">
      <div className="flex flex-col items-center justify-center">
        <div className="flex font-bold text-4xl">$ {CREDIT_PRICE}</div>
        <div className="flex">
          <div className="flex gap-1 justify-center items-baseline text-primary my-3">
            <p className="font-medium text-lg">+ {CREDITS} / </p>
            <p className="text-xs">credits</p>
          </div>
        </div>
      </div>
      {/*<div className="mb-4 mt-2">*/}
      {/*  <Slider defaultValue={[price]} max={100} min={5} step={5} onValueChange={handlePriceChange}/>*/}
      {/*</div>*/}
      <Button>Add credits</Button>
    </div>
  )
};