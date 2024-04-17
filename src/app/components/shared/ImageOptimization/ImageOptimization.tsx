import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType, UIEventType } from '@/eventType';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import { useTypedDispatch } from '@/app/redux/store';
import { getImages, setImagesForOptimization } from '@/app/redux/features';
import { Loading } from '@/app/components';

export const ImageOptimization = () => {
  const dispatch = useTypedDispatch();

  const { images, isLoading } = useSelector(getImages);

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

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <Loading />
      </div>
    )
  }

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