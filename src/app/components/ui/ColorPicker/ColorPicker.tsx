import React, { useRef, useState, useCallback } from 'react';

import { useClickOutside } from '@/app/hooks/useClickOutside';
import { cn } from '@/app/lib/utils';

type Props = {
  color?: string;
  onChange: (value: string) => void;
  className?: string;
  history: string[];
}

export const ColorPicker = ({ color, onChange, history }: Props) => {
  const popover = useRef();

  const [isOpen, toggle] = useState(false);

  const handleOnOpen = useCallback(() => toggle(true), []);

  const handleOnClose = useCallback(() => toggle(false), []);

  const handleOnChange = useCallback((e) => {
    onChange(e.target.value);
  }, []);

  useClickOutside(popover, handleOnClose);

  return (
    <div>
      <div
        style={{ backgroundColor: color }}
        className={cn('flex relative justify-center items-center h-5 w-5 border border-primary-primaryDark rounded-md hover:cursor-pointer', color ? `bg-[${color}]` : 'bg-white')}
        onClick={handleOnOpen}
      >
        {!color ? <div className="w-[17px] h-[1px] bg-red-600 -rotate-45" /> : null}
      </div>
      {isOpen ? (
        <div ref={popover} className="w-full absolute top-8 z-10 bg-primary-darkGray border border-primary-primaryDark rounded-lg">
          <ul className="flex p-3 border-b border-primary-primaryDark gap-1.5">
            <li
              className="flex relative justify-center items-center h-4 w-4 border border-primary-primaryDark rounded-md hover:cursor-pointer bg-white"
              onClick={() => onChange('')}>
              <span className="w-[12px] h-[1px] bg-red-600 -rotate-45"/>
            </li>
            {
              history ?
                history.map((item) => (
                  <li
                    key={item}
                    style={{ backgroundColor: item }}
                    className={cn(`flex relative justify-center items-center h-4 w-4 p-0.5 border border-primary-primaryDark rounded-md hover:cursor-pointer`)}
                    onClick={() => onChange(item)}
                  />
                )) : null
            }
          </ul>
          <div className="flex justify-between items-center p-3">
            <p className="text-sm text-primary-gray">Custom color</p>
            <div
              className="flex items-center justify-between gap-3 px-3 py-2 bg-primary-mainDark rounded-md border border-primary-primaryDark">
              <div style={{ backgroundColor: color }} className={`flex relative justify-center items-center h-4 w-4 p-0.5 border border-primary-primaryDark rounded-md bg-[${color}]`} />
              <input type="text" placeholder="hex color" className="bg-primary-mainDark focus:outline-none rounded-md max-w-20 placeholder:text-sm placeholder:text-gray-700" value={color} onChange={handleOnChange}/>
            </div>
          </div>
        </div>
      ): null}
    </div>
  )
}
