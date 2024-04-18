import React, { useCallback } from 'react';
import { EventType } from '@/eventType';

import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import { EmptyImageSelector, ImagePreview } from '@/app/components';

import { useTypedDispatch } from '@/app/redux/store';
import { getFaviconImageData, updateSelectedImage } from '@/app/redux/features';
import { useSelector } from 'react-redux';

export const FaviconPreview = () => {
  const imageData = useSelector(getFaviconImageData);

  const dispatch = useTypedDispatch();

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message.type === EventType.IMAGE_UNIT_ARRAY_DATA) {
      dispatch(updateSelectedImage(message.payload?.data))
    }
  }, []);

  useWindowMessaging(handleFigmaPluginMessages);

  return (
    <div className="flex items-center justify-center my-8">
      {imageData ? (
        <ImagePreview imageUrl={convertToImageUrl(imageData)} />
      ): (
        <EmptyImageSelector />
      )}

    </div>
  )
}