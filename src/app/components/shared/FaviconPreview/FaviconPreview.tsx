import React, { useCallback, useState } from 'react';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType } from '@/eventType';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';

export type MessageType = {
  type: string;
  payload: any;
};

export const FaviconPreview = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    console.log('message', message);
    if (message.type === EventType.IMAGE_UNIT_ARRAY_DATA) {
      const imageUrl = convertToImageUrl(message.payload?.data)
      setImageUrl(imageUrl)
    }
    console.log('message: ', message)
  }, []);

  useWindowMessaging(handleFigmaPluginMessages);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt={'Image from data'}/>
      ): null}

    </div>
  )
}