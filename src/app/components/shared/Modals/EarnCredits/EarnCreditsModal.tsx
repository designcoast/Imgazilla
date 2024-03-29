import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, PriceSelector, Separator
} from '@/app/components';
import { useSelector } from 'react-redux';
import { getAccount } from '@/app/redux/features';

export const EarnCreditsModal = () => {
  const accountDetails = useSelector(getAccount);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>Earn More Credits</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-medium">Your account balance</DialogTitle>
          <div className="text-center">
            <div className="flex gap-1 justify-center items-baseline text-primary my-3">
              <p className="font-bold text-3xl">{accountDetails.credits} / </p>
              <p className="text-lg">credits</p>
            </div>
          </div>
          <DialogDescription className="text-primary-gray">~ 3 export favicon archives or 15 optimise images</DialogDescription>
          <DialogDescription className="text-primary-gray">Credits stack and <span className="font-bold">expire monthly</span>, with no rollover.</DialogDescription>
          <div className="!mt-4 !mb-2">
            <Separator/>
          </div>
        </DialogHeader>
        <PriceSelector />
      </DialogContent>
    </Dialog>
  )
};
