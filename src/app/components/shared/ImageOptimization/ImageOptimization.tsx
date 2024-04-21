import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType, UIEventType } from '@/eventType';
import { useTypedDispatch } from '@/app/redux/store';
import { getImages, setImagesForOptimization } from '@/app/redux/features';
import {
  ImageOptimizationList
} from '@/app/components';
import {
  ImageOptimizationSettings
} from '@/app/components/shared/ImageOptimization/ImageOptimizationSettings/ImageOptimizationSettings';

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
      <ImageOptimizationSettings />
      <ImageOptimizationList />
    </>
  )
}