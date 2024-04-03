import React from 'react';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { useCallback, useEffect } from 'react';
import { EventType, UIEventType } from '@/eventType';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import { useTypedDispatch } from '@/app/redux/store';
import { getImages, setImagesForOptimization } from '@/app/redux/features';
import { useSelector } from 'react-redux';

export const ImageOptimization = () => {
  const dispatch = useTypedDispatch();

  const images = useSelector(getImages);

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message.type === EventType.IMAGES_UINT_ARRAY_COLLECTION) {
      dispatch(setImagesForOptimization(message.payload.data));
    }
  }, []);

  const { onSendMessage } = useWindowMessaging(handleFigmaPluginMessages);

  useEffect(() => {
    if (images.length > 0) {
      return
    }

    onSendMessage({
      type: UIEventType.GET_IMAGES_UINT_ARRAY_COLLECTION,
      payload: {}
    })
  }, [images]);

  return (
    <>
      {images.map((item, index) => {
        const img = convertToImageUrl(item);

        return (
          <img key={index} src={img} alt={`alt-${index}`}/>
        )
      })}
    </>
  )
}