import React from 'react';
import { Button } from '@/app/components';
import { cn } from '@/app/lib/utils';

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  isDisabled?: boolean;
  isShowShadow?: boolean;
  className?: string;
}

export const ExportButton = ({ onClick, children, isDisabled = false, isShowShadow = true, className }: Props) => {
  return (
    <div className={cn('flex bottom-0 w-full', className)}>
      {isShowShadow ? (
        <div className="bg-gradient-to-t from-exportButtonShadowFrom via-exportButtonShadowFrom to-exportButtonShadowTo h-14 w-full absolute bottom-[36px]"></div>
      ) : null}
      <Button
        className="rounded-none w-full"
        type={onClick ? "button" : "submit"}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </Button>
    </div>
  )
};
