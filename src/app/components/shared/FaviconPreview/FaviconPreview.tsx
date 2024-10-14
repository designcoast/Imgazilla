import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { EventType } from '@/eventType';

import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import {
  EmptyImageSelector,
  FaviconPreviewSheet,
  ImagePreview,
} from '@/app/components';

import { useTypedDispatch } from '@/app/redux/store';
import { getFaviconImageData, updateSelectedImage } from '@/app/redux/features';
import { useMixpanel } from '@/app/hooks/useMixpanleAnalytics';
import { ANALYTIC_EVENTS, PNG_FORMAT } from '@/app/constants';

export const FaviconPreview = () => {
  const [isOpen, setIsOpen] = useState(false);

  const imageData = useSelector(getFaviconImageData);
  const trackClick = useMixpanel();

  const dispatch = useTypedDispatch();

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message?.type === EventType.IMAGE_UNIT_ARRAY_DATA) {
      dispatch(updateSelectedImage(message.payload?.data));
    }
  }, []);

  const handleOnOpenModal = useCallback((open: boolean) => {
    trackClick('click', {
      name: ANALYTIC_EVENTS.OPEN_FAVICON_PREVIEW,
    });

    setIsOpen(open);
  }, []);

  useWindowMessaging(handleFigmaPluginMessages);

  return (
    <div className='flex flex-col items-center justify-between p-3'>
      <div className='flex my-11'>
        {imageData ? (
          <ImagePreview imageUrl={convertToImageUrl(imageData, PNG_FORMAT)} />
        ) : (
          <EmptyImageSelector />
        )}
      </div>
      <FaviconPreviewSheet
        isOpen={isOpen}
        onOpenChange={handleOnOpenModal}
        isDisabled={!imageData}
      />
    </div>
  );
};
