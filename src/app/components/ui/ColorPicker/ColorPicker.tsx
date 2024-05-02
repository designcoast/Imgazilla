import React, { useRef, useState, useCallback } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

import { useClickOutside } from '@/app/hooks/useClickOutside';
import { cn } from '@/app/lib/utils';

type Props = {
  color: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ColorPicker = ({ color, onChange, className }: Props) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const handleOnOpen = useCallback(() => toggle(true), []);

  const handleOnClose = useCallback(() => toggle(false), []);

  useClickOutside(popover, handleOnClose);

  return (
    <div className="relative">
      <HexColorInput
        prefixed
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        color={color}
        onClick={handleOnOpen}
        onChange={onChange}
      />
      {isOpen ? (
        <div ref={popover} className="w-full absolute">
          <HexColorPicker
            className="!w-full mt-4 color-picker-small"
            color={color}
            onChange={onChange}
          />
        </div>
      ): null}
    </div>
  )
}
