import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { getAccount } from '@/app/redux/features';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  InstructionModal, EarnCreditsModal
} from '@/app/components';

export const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const accountDetails = useSelector(getAccount);

  return (
    <div className="flex">
      <Popover onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <div className="flex gap-2 items-center bg-primary-secondDark py-2 px-3 rounded-lg border border-primary-primaryDark">
            <div className="flex gap-1 items-center">
              <p className="font-bold text-sm">{accountDetails.credits}</p>
              <p className="text-sm">credits</p>
              <div className="w-[32px] h-[25px] overflow-hidden rounded-sm ml-2.5">
                <img src={accountDetails.photoUrl} alt={accountDetails.name}/>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="stroke-input" size={14} />
            ) : (
              <ChevronDown className="stroke-input" size={14} />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent sideOffset={6} className="flex flex-col items-start rounded-lg bg-primary-secondDark border border-primary-primaryDark w-full py-2 px-2">
          <EarnCreditsModal/>
          <InstructionModal/>
        </PopoverContent>
      </Popover>
    </div>
  )
}