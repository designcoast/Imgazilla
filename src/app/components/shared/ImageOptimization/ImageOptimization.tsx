import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { toast, } from 'sonner';

import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType, UIEventType } from '@/eventType';
import { useTypedDispatch } from '@/app/redux/store';
import {
  FAVICON_TAB,
  getGeneralOptimizationPercent, getImages,
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
  ImageOptimizationList, ExportButton, ImageOptimizationResult, EarnCreditsSheet
} from '@/app/components';
import { useOptimizeImageMutation } from '@/app/redux/services';
import { transformAndCompressData } from '@/app/lib/compressData';

export const ImageOptimization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHideScrollTo, setIsHideScrollTo] = useState(false);
  const [isOptimizationStarted, setIsOptimizationStarted] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [optimizeImage] = useOptimizeImageMutation();

  const dispatch = useTypedDispatch();

  const isImageOptimizationResultsOpen = useSelector(getIsImageOptimizationResultsOpen)
  const generalOptimizationPercent = useSelector(getGeneralOptimizationPercent)
  const selectedImages = useSelector(getSelectedImages);
  const images = useSelector(getImages);

  const onOptimizeImage = useCallback(() => {
    setIsOptimizationStarted(true);
    setIsLoading(true);
    optimizeImage(transformAndCompressData(selectedImages))
      .unwrap()
      .then(({ jobId }: {
        jobId: string
      }) => {
        dispatch(setImageOptimizationJobId({ jobId }))
        dispatch(setImageOptimizationResultPageState({ isOpen: true }));
      }).catch((error) => {
        toast.info('Error while generating favicon', {
          description: error?.data?.message,
          action: {
            label: 'Purchase',
            onClick: () => setIsOpenModal(true)
          },
          duration: 5000
        });
    }).finally(() => {
      setIsLoading(false);
      setIsOptimizationStarted(false);
    })
  }, [selectedImages, generalOptimizationPercent]);

  const onFetchImageCollection = useCallback(() => {
    setIsLoading(true);

    onSendMessage({
      type: UIEventType.GET_IMAGES_UINT_ARRAY_COLLECTION,
      payload: {}
    })

  }, []);

  const onCheckSelectedImages = useCallback(() => {
    onSendMessage({
      type: UIEventType.GET_SELECTED_IMAGES_UINT_ARRAY,
      payload: {}
    })
  }, []);

  const handleOnOpenChange = useCallback((isOpen: boolean) => {
    setIsOpenModal(isOpen);
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

    if (message?.type === EventType.IMAGE_COLLECTION_COMPLETE || message?.type === EventType.SELECTED_IMAGES_COLLECTION_COMPLETE) {
      setIsLoading(false);
      onDisableTab(false);
    }

    if (message?.type === EventType.SELECTED_IMAGES_COLLECTION) {
      if (message?.payload?.data?.length === 0) {
        handleOnFetchImageCollection();
        return;
      }

      dispatch(setImagesForOptimization(message.payload.data));
    }

  }, [handleOnFetchImageCollection]);

  const { onSendMessage } = useWindowMessaging(handleFigmaPluginMessages);

  const isDisabled = selectedImages.length === 0;

  useEffect(() => {
    onCheckSelectedImages();
  }, [onCheckSelectedImages]);

  return (
    <>
      {isImageOptimizationResultsOpen ? (
        <ImageOptimizationResult />
        ) : (
        <>
          <div className="flex flex-col relative w-full">
            <ImageOptimizationSettings onRefresh={handleOnRefresh} />
            <ImageOptimizationList
              data={images}
              isLoading={isLoading}
              isHideScrollTo={isHideScrollTo}
              onUpdateScrollTo={setIsHideScrollTo}
            />
            <ExportButton onClick={onOptimizeImage} isDisabled={isDisabled || isOptimizationStarted}>
              Optimize {selectedImages.length} images
            </ExportButton>
            <EarnCreditsSheet showTrigger={false} isOpen={isOpenModal} onOpenChange={handleOnOpenChange} />
          </div>
          {isLoading ? (<Overlay/>) : null }
        </>
      )}
    </>
  )
}