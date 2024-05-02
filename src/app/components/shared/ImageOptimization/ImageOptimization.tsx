import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType, UIEventType } from '@/eventType';
import { useTypedDispatch } from '@/app/redux/store';
import { getImages, reset, setImagesForOptimization } from '@/app/redux/features';
import {
  Overlay,
  ImageOptimizationSettings,
  ImageOptimizationList
} from '@/app/components';

export const ImageOptimization = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useTypedDispatch();

  const images = useSelector(getImages);

  const onFetchImageCollection = useCallback(() => {

    setIsLoading(true);

    onSendMessage({
      type: UIEventType.GET_IMAGES_UINT_ARRAY_COLLECTION,
      payload: {}
    })

  }, []);

  const handleOnRefresh = useCallback(() => {
    dispatch(reset());
  }, []);

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message?.type === EventType.IMAGES_UINT_ARRAY_COLLECTION) {
      dispatch(setImagesForOptimization(message.payload.data));
    }

    if (message?.type === EventType.IMAGE_COLLECTION_COMPLETE) {
      setIsLoading(false);
    }
  }, []);

  const { onSendMessage } = useWindowMessaging(handleFigmaPluginMessages);

  useEffect(() => {
    if (images.length > 0) {
      return
    }

    onFetchImageCollection();
  }, [images]);

  return (
    <>
      <div className="flex flex-col">
        <ImageOptimizationSettings onRefresh={handleOnRefresh} />
        <ImageOptimizationList/>
      </div>
      {isLoading ? (<Overlay/>) : null }
    </>
  )
}