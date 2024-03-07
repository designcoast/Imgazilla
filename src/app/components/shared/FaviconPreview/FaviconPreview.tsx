import React, { useCallback, useState } from 'react';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType } from '@/eventType';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import { EmptyImageSelector, ImagePreview } from '@/app/components';

export type MessageType = {
  type: string;
  payload: any;
};

export const FaviconPreview = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message.type === EventType.IMAGE_UNIT_ARRAY_DATA) {
      const imageUrl = convertToImageUrl(message.payload?.data)
      setImageUrl(imageUrl)
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