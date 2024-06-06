import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getAccount } from '@/app/redux/features';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  InstructionModal, EarnCreditsModal, TooltipProvider, Tooltip, TooltipTrigger, TooltipContent
} from '@/app/components';

const DISCORD_URL = process.env.DISCORD_HELP_COMMUNITY_URL;

export const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const accountDetails = useSelector(getAccount);

  const handleOnHelpClick = useCallback(() => {
    window.open(DISCORD_URL, '_blank');
  }, []);

  return (
    <div className="flex">
      <Popover onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <div className="flex gap-2 items-center bg-tabBG py-2 px-5 rounded-lg">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="p-0 h-fit">
                  <div className="flex gap-1 items-center">
                    <p className="font-bold text-sm">{accountDetails.credits}</p>
                    <p className="text-sm">credits</p>

                    <div className="w-[32px] h-[25px] overflow-hidden rounded-sm ml-2.5">
                      <img src={accountDetails.photoUrl} alt={accountDetails.name}/>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="flex">
                    Credits stack and <span className="inline-block font-bold ml-0.5">expire monthly</span>, with no
                    rollover.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {isOpen ? (
              <ChevronUp className="stroke-input"/>
            ) : (
              <ChevronDown className="stroke-input"/>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-start border-none w-full">
          <EarnCreditsModal/>
          <InstructionModal/>
          <Button variant='link' onClick={handleOnHelpClick}>Need Help?</Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}