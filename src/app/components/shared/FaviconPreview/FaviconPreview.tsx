import React, { useCallback, useState } from 'react';
import { EventType } from '@/eventType';

import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import { EmptyImageSelector, ImagePreview } from '@/app/components';

import { useTypedDispatch } from '@/app/redux/store';
import { updateSelectedImage } from '@/app/redux/features';

export type MessageType = {
  type: string;
  payload: any;
};

export const FaviconPreview = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const dispatch = useTypedDispatch();

  const handleUpdatePreviewImage = useCallback((data: Uint8Array) => {
    const imageUrl = convertToImageUrl(data)
    setImageUrl(imageUrl)
  }, []);

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message.type === EventType.IMAGE_UNIT_ARRAY_DATA) {
      handleUpdatePreviewImage(message.payload?.data);

      dispatch(updateSelectedImage(message.payload?.data))
    }
  }, []);

  useWindowMessaging(handleFigmaPluginMessages);

  return (
    <div className="flex items-center justify-center my-8">
      {imageUrl ? (
        <ImagePreview imageUrl={imageUrl} />
      ): (
        <EmptyImageSelector />
      )}

    </div>
  )
}