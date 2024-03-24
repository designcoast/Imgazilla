import React from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { getAccount } from '@/app/redux/features';


export const Account = () => {
  const accountDetails = useSelector(getAccount);
  return (
    <div className="flex">
      <div className="flex gap-2 bg-tabBG py-2 px-5 rounded-lg">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-sm">{accountDetails.credits}</p>
          <p className="text-sm">credits</p>
        </div>
        <div className="w-[32px] h-[25px] overflow-hidden rounded-sm ml-2.5">
          <img src={accountDetails.photoUrl} alt={accountDetails.name}/>
        </div>
        <ChevronDown className="stroke-input"/>
      </div>
    </div>

  )
}