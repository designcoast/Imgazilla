import React, { ReactNode } from 'react';
import { Button } from '@/app/components';
import { cn } from '@/app/lib/utils';

type Props = {
  onClick?: () => void;
  children: ReactNode;
  isDisabled?: boolean;
  className?: string;
};

export const ExportButton = ({
  onClick,
  children,
  isDisabled = false,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        'flex justify-end mt-0.5 p-3 bg-primary-secondDark rounded-lg border border-primary-primaryDark',
        className,
      )}
    >
      <Button
        type={onClick ? 'button' : 'submit'}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </Button>
    </div>
  );
};
