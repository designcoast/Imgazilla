import React, { useMemo } from 'react';
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
import { calculateCredits } from '@/app/lib/calculateCredits';

export const EarnCreditsModal = () => {
  const accountDetails = useSelector(getAccount);
  const { favicon, images } = useMemo(() => calculateCredits(accountDetails.credits), [accountDetails]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>Buy More Credits</Button>
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
          <DialogDescription className="text-primary-gray">~ {favicon} export favicon archives or {images} optimized image archives</DialogDescription>
          <DialogDescription className="text-primary-gray font-bold">All credits stack.</DialogDescription>
          <div className="!mt-4 !mb-2">
            <Separator/>
          </div>
        </DialogHeader>
        <PriceSelector />
      </DialogContent>
    </Dialog>
  )
};
