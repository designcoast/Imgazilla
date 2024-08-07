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

const mockedImage = [
  {
  "uuid": "86fd1fa0-d9bf-4ad8-95cb-1f426460b889",
  "name": "Logo",
  "width": 800,
  "height": 900,
  "setting": {
      "format": "PNG",
      "suffix": "suffix_for_testing",
      "contentsOnly": true,
      "colorProfile": "DOCUMENT",
      "constraint": {
          "type": "SCALE",
          "value": 4
      }
  },
  "format": "SVG",
  "uintArray": '',
  "optimizationPercent": 100,
  "isSelected": false,
  "size": 32.41015625
}, {
  "uuid": "86fd1fa0-d9bf-4ad8-95cb-1f426460b889",
  "name": "Logo",
  "width": 38,
  "height": 38,
  "setting": {
      "format": "PNG",
      "suffix": "",
      "contentsOnly": true,
      "colorProfile": "DOCUMENT",
      "constraint": {
          "type": "SCALE",
          "value": 4
      }
  },
  "format": "PNG",
  "uintArray": '',
  "optimizationPercent": 100,
  "isSelected": false,
  "size": 32.41015625
},
  {
    "uuid": "86fd1fa0-d9bf-4ad8-95cb-1f426460b889",
    "name": "Logo",
    "width": 1200,
    "height": 2600,
    "setting": {
      "format": "PNG",
      "suffix": "",
      "contentsOnly": true,
      "colorProfile": "DOCUMENT",
      "constraint": {
        "type": "SCALE",
        "value": 4
      }
    },
    "format": "JPG",
    "uintArray": '',
    "optimizationPercent": 100,
    "isSelected": false,
    "size": 32.41015625
  },
  {
    "uuid": "86fd1fa0-d9bf-4ad8-95cb-1f426460b889",
    "name": "Logo",
    "width": 38,
    "height": 38,
    "setting": {
      "format": "PNG",
      "suffix": "",
      "contentsOnly": true,
      "colorProfile": "DOCUMENT",
      "constraint": {
        "type": "SCALE",
        "value": 4
      }
    },
    "format": "PDF",
    "uintArray": '',
    "optimizationPercent": 100,
    "isSelected": false,
    "size": 32.41015625
  }
]

export const ImageOptimization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [optimizeImage] = useOptimizeImageMutation();

  const dispatch = useTypedDispatch();

  const isImageOptimizationResultsOpen = useSelector(getIsImageOptimizationResultsOpen)
  const generalOptimizationPercent = useSelector(getGeneralOptimizationPercent)
  const selectedImages = useSelector(getSelectedImages);
  const images = useSelector(getImages);

  const onOptimizeImage = useCallback(() => {
    optimizeImage(transformAndCompressData(selectedImages))
      .unwrap()
      .then(({ jobId }: {
        jobId: string
      }) => {
        dispatch(setImageOptimizationJobId({ jobId }))
        dispatch(setImageOptimizationResultPageState({ isOpen: true }))
      }).catch((error) => {
        toast.info('Error while generating favicon', {
          description: error?.data?.message,
          action: {
            label: 'Purchase',
            onClick: () => setIsOpenModal(true)
          },
          duration: 5000
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

    if (message?.type === EventType.IMAGE_COLLECTION_COMPLETE) {
      setIsLoading(false);
      onDisableTab(false);
    }
  }, []);

  const { onSendMessage } = useWindowMessaging(handleFigmaPluginMessages);

  const isDisabled = selectedImages.length === 0;

  useEffect(() => {
    if (images.length !== 0) {
      return;
    }
    // handleOnFetchImageCollection();
    dispatch(setImagesForOptimization(mockedImage as any));
  }, [handleOnFetchImageCollection]);

  return (
    <>
      {isImageOptimizationResultsOpen ? (
        <ImageOptimizationResult />
        ) : (
        <>
          <div className="flex flex-col relative w-full">
            <ImageOptimizationSettings onRefresh={handleOnRefresh} />
            <ImageOptimizationList isLoading={isLoading} data={images}/>
            <ExportButton onClick={onOptimizeImage} isDisabled={isDisabled}>
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