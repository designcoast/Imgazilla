import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType, UIEventType } from '@/eventType';
import { useTypedDispatch } from '@/app/redux/store';
import {
  FAVICON_TAB,
  getGeneralOptimizationPercent,
  getIsImageOptimizationResultsOpen,
  getSelectedImages,
  reset,
  setDisableTab, setImageOptimizationJobId,
  setImageOptimizationResultPageState,
  setImagesForOptimization
} from '@/app/redux/features';

import {
  Overlay,
  ImageOptimizationSettings,
  ImageOptimizationList, ExportButton, ImageOptimizationResult
} from '@/app/components';
import { useOptimizeImageMutation } from '@/app/redux/services';
import { transformAndCompressData } from '@/app/lib/compressData';
import { useToast } from '@/app/hooks/useToast';

export const ImageOptimization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [optimizeImage] = useOptimizeImageMutation();

  const dispatch = useTypedDispatch();
  const { toast } = useToast();

  const isImageOptimizationResultsOpen = useSelector(getIsImageOptimizationResultsOpen)
  const generalOptimizationPercent = useSelector(getGeneralOptimizationPercent)
  const selectedImages = useSelector(getSelectedImages);

  const onOptimizeImage = useCallback(() => {
    optimizeImage(transformAndCompressData(selectedImages))
      .unwrap()
      .then(({ jobId }: {
        jobId: string
      }) => {
        dispatch(setImageOptimizationJobId({ jobId }))
        dispatch(setImageOptimizationResultPageState({ isOpen: true }))
      }).catch((error) => {
        toast({
          title: 'Error while optimizing image',
          description: error,
        });
    })
  }, [selectedImages, generalOptimizationPercent]);

  const onFetchImageCollection = useCallback(() => {
    setIsLoading(true);

    onSendMessage({
      type: UIEventType.GET_IMAGES_UINT_ARRAY_COLLECTION,
      payload: {}
    })

  }, []);

  const onDisableTab = useCallback((isDisabled: boolean = true) => {
    dispatch(setDisableTab({ name: FAVICON_TAB, isDisabled }));
  }, [])

  const handleOnRefresh = useCallback(() => {
    dispatch(reset());
    handleOnFetchImageCollection();
  }, []);

  const handleOnFetchImageCollection = useCallback(() => {
    onDisableTab();
    onFetchImageCollection();
  }, []);

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message?.type === EventType.IMAGES_UINT_ARRAY_COLLECTION) {
      dispatch(setImagesForOptimization(message.payload.data));
    }

    if (message?.type === EventType.IMAGE_COLLECTION_COMPLETE) {
      setIsLoading(false);
      onDisableTab(false);
    }
  }, []);

  const { onSendMessage } = useWindowMessaging(handleFigmaPluginMessages);

  const isDisabled = selectedImages.length === 0;

  useEffect(() => {
    handleOnFetchImageCollection();
  }, [handleOnFetchImageCollection]);

  return (
    <>
      {isImageOptimizationResultsOpen ? (
        <ImageOptimizationResult />
        ) : (
        <>
          <div className="flex flex-col relative">
            <ImageOptimizationSettings onRefresh={handleOnRefresh} />
            <div className="min-h-[488px]">
              <ImageOptimizationList isLoading={isLoading}/>
            </div>
            <ExportButton onClick={onOptimizeImage} isDisabled={isDisabled} className="absolute">Export</ExportButton>
          </div>
          {isLoading ? (<Overlay/>) : null }
        </>
      )}
    </>
  )
}