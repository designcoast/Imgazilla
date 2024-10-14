import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType, UIEventType } from '@/eventType';
import {
  getSelectedBackgroundRemovalImage,
  resetBackgroundRemovalState,
  setSelectedImage,
} from '@/app/redux/features';
import { useSelector } from 'react-redux';
import {
  BackgroundRemovalPreview,
  BackgroundRemovalSettings,
  Overlay,
} from '@/app/components';
import { useTypedDispatch } from '@/app/redux/store';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import { PNG_FORMAT } from '@/app/constants';

export const BackgroundRemoval = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useTypedDispatch();

  const imageData = useSelector(getSelectedBackgroundRemovalImage);

  const imageDataUrl = useMemo(
    () => (imageData ? convertToImageUrl(imageData, PNG_FORMAT) : undefined),
    [imageData],
  );

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    try {
      if (message?.type === EventType.SELECTED_IMAGES_COLLECTION) {
        const data = message?.payload?.data[0];
        const { uintArray } = data;
        dispatch(setSelectedImage(uintArray));
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  }, []);

  const onCheckSelectedImages = useCallback(() => {
    setIsLoading(true);

    onSendMessage({
      type: UIEventType.GET_SELECTED_IMAGES_UINT_ARRAY,
      payload: {},
    });
  }, []);

  const handleOnRefreshSelectedNode = useCallback(() => {
    dispatch(resetBackgroundRemovalState());
    onCheckSelectedImages();
  }, []);

  const { onSendMessage } = useWindowMessaging(handleFigmaPluginMessages);

  useEffect(() => {
    if (imageData) {
      return;
    }

    onCheckSelectedImages();

    return () => {
      dispatch(resetBackgroundRemovalState());
    };
  }, []);

  return (
    <>
      <div className='flex flex-col relative w-full'>
        <BackgroundRemovalSettings onRefresh={handleOnRefreshSelectedNode} />
        <BackgroundRemovalPreview sourceImageData={imageDataUrl} />
      </div>
      {isLoading ? <Overlay /> : null}
    </>
  );
};
