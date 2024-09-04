import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components';

export const Credits = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>Instructions</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='w-[80%]'>
          <DialogTitle className='text-left text-lg'>Need Help?</DialogTitle>
          <DialogDescription>
            Feel free to reach out to us through our public Discord channel.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
