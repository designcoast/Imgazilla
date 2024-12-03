import React, { useCallback, useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components';
import { UIEventType } from '@/eventType';

import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';

const STORAGE_KEY = 'showBonusModal';

export const BonusModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message?.type === UIEventType.SET_CLIENT_STORAGE_DATA) {
      if (message.payload.key !== STORAGE_KEY) {
        return;
      }

      setIsOpen(message?.payload?.value || false);
    }
  }, []);

  // const handleOnOpenModal = useCallback((open: boolean) => {
  //   trackClick('click', {
  //     name: ANALYTIC_EVENTS.OPEN_FAVICON_PREVIEW,
  //   });
  //
  //   setIsOpen(open);
  // }, []);

  const { onSendMessage } = useWindowMessaging(handleFigmaPluginMessages);

  useEffect(() => {
    onSendMessage({
      type: UIEventType.GET_CLIENT_STORAGE_DATA,
      payload: {
        key: STORAGE_KEY,
      },
    });
  }, []);

  return (
    <Dialog open={isOpen}>
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
