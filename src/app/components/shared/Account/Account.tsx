import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getAccount } from '@/app/redux/features';
import { Popover, PopoverContent, PopoverTrigger, Button } from '@/app/components';


export const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const accountDetails = useSelector(getAccount);
  return (
    <div className="flex">
      <Popover onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <div className="flex gap-2 bg-tabBG py-2 px-5 rounded-lg">
            <div className="flex gap-1 items-center">
              <p className="font-bold text-sm">{accountDetails.credits}</p>
              <p className="text-sm">credits</p>
            </div>
            <div className="w-[32px] h-[25px] overflow-hidden rounded-sm ml-2.5">
              <img src={accountDetails.photoUrl} alt={accountDetails.name}/>
            </div>
            {isOpen ? (
              <ChevronUp className="stroke-input"/>
              ) : (
              <ChevronDown className="stroke-input"/>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex">
            <Button variant='link'>Earn More Credits</Button>
          </div>
          <div className="flex">
            <Button variant='link'>Instructions</Button>
          </div>
          <div className="flex">
            <Button variant='link'>Need Help?</Button>
          </div>
        </PopoverContent>
      </Popover>

    </div>

  )
}