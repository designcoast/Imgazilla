import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/app/components';

type Props = {
  open: boolean;
};

export const FaviconExporterSheet = ({ open }: Props) => {
  return (
    <Sheet open={open}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
};
