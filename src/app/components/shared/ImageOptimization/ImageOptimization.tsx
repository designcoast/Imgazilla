import React from 'react';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { useCallback, useEffect, useState } from 'react';
import { EventType, UIEventType } from '@/eventType';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';

export const ImageOptimization = () => {
  const [data, setData] = useState([]);
  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message.type === EventType.IMAGES_UINT_ARRAY_COLLECTION) {
      console.log(message.payload.data)
      setData(message.payload.data);
    }
  }, []);

  const { onSendMessage } = useWindowMessaging(handleFigmaPluginMessages);

  useEffect(() => {
    onSendMessage({
      type: UIEventType.GET_IMAGES_UINT_ARRAY_COLLECTION,
      payload: {}
    })
  }, []);

  return (
    <>
      {data.map((item, index) => {
        const img = convertToImageUrl(item);

        return (
          <img key={index} src={img} alt={`alt-${index}`}/>
        )
      })}
    </>
  )
}