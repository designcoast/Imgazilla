import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { encode } from 'base64-arraybuffer-es6';

import { toast } from 'sonner';

import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType, UIEventType } from '@/eventType';
import {
  getBackgroundRemovalProcessJobId,
  getBackgroundRemovalProcessResult,
  getSelectedBackgroundRemovalImage,
  resetBackgroundRemovalState,
  setBackgroundRemovalJobId,
  setBackgroundRemovalResult,
  setSelectedImage,
  updateAccountCredits,
} from '@/app/redux/features';
import {
  BackgroundRemovalPreview,
  BackgroundRemovalSettings,
  Button,
  EarnCreditsSheet,
  Footer,
  Overlay,
  SaveImage,
} from '@/app/components';
import { useTypedDispatch } from '@/app/redux/store';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';
import {
  ANALYTIC_EVENTS,
  FORMAT_TO_MIME_TYPE,
  PNG_FORMAT,
} from '@/app/constants';
import {
  baseApi,
  useLazyGetAccountCreditsQuery,
  useLazyGetBackgroundRemovalProcessStatusQuery,
  useLazyGetBackgroundRemovalResultQuery,
  useRemoveImageBackgroundMutation,
} from '@/app/redux/services';
import { base64ToUint8Array } from '@/app/lib/utils';
import { useMixpanel } from '@/app/hooks/useMixpanleAnalytics';

const POOLING_INTERVAL = 3000;

export const BackgroundRemoval = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [name, setName] = useState('image');
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  const [pollingInterval, setPollingInterval] = useState(POOLING_INTERVAL);

  const processedImageData = useSelector(getBackgroundRemovalProcessResult);
  const jobId = useSelector(getBackgroundRemovalProcessJobId);

  const [removeBackground] = useRemoveImageBackgroundMutation();
  const [getProcessStatus, { data }] =
    useLazyGetBackgroundRemovalProcessStatusQuery({
      pollingInterval,
    });
  const [getBackgroundRemovalResult] = useLazyGetBackgroundRemovalResultQuery();

  const [getAccountCredits] = useLazyGetAccountCreditsQuery();

  const onTrackClick = useMixpanel({
    pageName: ANALYTIC_EVENTS.BACKGROUND_REMOVAL_PAGE,
  });

  const dispatch = useTypedDispatch();

  const imageData = useSelector(getSelectedBackgroundRemovalImage);

  const imageDataUrl = useMemo(
    () => (imageData ? convertToImageUrl(imageData, PNG_FORMAT) : undefined),
    [imageData],
  );

  const processedImageDataUrl = useMemo(
    () =>
      processedImageData
        ? `data:${FORMAT_TO_MIME_TYPE[PNG_FORMAT]};base64,${processedImageData}`
        : undefined,
    [processedImageData],
  );

  const handleOnRemoveBackground = useCallback(() => {
    setIsProcessing(true);
    setIsLoading(true);

    onTrackClick('click', {
      name: ANALYTIC_EVENTS.BACKGROUND_REMOVAL_CLICK,
    });

    removeBackground({ image: encode(imageData) })
      .unwrap()
      .then(({ jobId }: { jobId: string }) => {
        dispatch(setBackgroundRemovalJobId({ jobId }));
      })
      .catch((error) => {
        toast.info('Error while background removing', {
          description: error?.data?.message,
          action: {
            label: 'Purchase',
            onClick: () => setIsOpenModal(true),
          },
          duration: 5000,
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsProcessing(false);
      });
  }, [imageData]);

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    try {
      if (message?.type === EventType.SELECTED_IMAGES_COLLECTION_COMPLETE) {
        setIsLoading(false);
      }

      if (message?.type === EventType.SELECTED_IMAGES_COLLECTION) {
        const data = message?.payload?.data[0];
        const { uintArray, name, width, height } = data;
        setName(name);
        setDimensions({ width, height });
        dispatch(setSelectedImage(uintArray));
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);

      toast('Error', {
        description: e,
      });
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
    dispatch(baseApi.util.resetApiState());
    setPollingInterval(POOLING_INTERVAL);

    onCheckSelectedImages();
  }, []);

  const handleOnAddToPage = useCallback(() => {
    if (!processedImageDataUrl) {
      return;
    }
    onTrackClick('click', {
      name: ANALYTIC_EVENTS.BACKGROUND_REMOVAL_CLICK_ON_ADD_TO_PAGE,
    });

    onSendMessage({
      type: UIEventType.ADD_IMAGE_TO_PAGE,
      payload: {
        name,
        dimensions,
        processedImageData: base64ToUint8Array(processedImageDataUrl),
      },
    });
  }, [processedImageDataUrl]);

  const handleOnSaveImage = useCallback(() => {
    onTrackClick('click', {
      name: ANALYTIC_EVENTS.BACKGROUND_REMOVAL_CLICK_ON_DOWNLOAD,
    });
  }, []);

  const handleOnOpenChange = useCallback((isOpen: boolean) => {
    setIsOpenModal(isOpen);
  }, []);

  const { onSendMessage } = useWindowMessaging(handleFigmaPluginMessages);

  useEffect(() => {
    if (imageData || isChecked) {
      return;
    }

    setIsChecked(true);
    onCheckSelectedImages();
  }, [imageData, isChecked]);

  useEffect(() => {
    if (isLoading || isProcessing || processedImageData || !jobId) {
      return;
    }

    getProcessStatus(jobId);
    setIsLoading(true);
  }, [jobId, isLoading, isProcessing, processedImageData]);

  useEffect(() => {
    if (!data || processedImageData) {
      return;
    }

    if (data?.status === 200) {
      setPollingInterval(0);

      getBackgroundRemovalResult(jobId)
        .unwrap()
        .then(({ result: processedImageData }) => {
          dispatch(setBackgroundRemovalResult({ processedImageData }));
          getAccountCredits('')
            .unwrap()
            .then((credits: string) => {
              dispatch(updateAccountCredits({ credits }));
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast('Error', {
            description: 'Something went wrong, please try again!',
          });
          setIsLoading(false);
        });
    }
  }, [jobId, data, processedImageData]);

  return (
    <>
      <div className='flex flex-col relative w-full'>
        <BackgroundRemovalSettings onRefresh={handleOnRefreshSelectedNode} />
        <BackgroundRemovalPreview
          sourceImageData={imageDataUrl}
          processedImageData={processedImageDataUrl}
        />
        <Footer>
          {processedImageDataUrl ? (
            <div className='flex w-full justify-between'>
              <Button onClick={handleOnAddToPage} disabled={isProcessing}>
                Add to Page
              </Button>
              <SaveImage
                base64Image={processedImageDataUrl}
                name={name}
                onClick={handleOnSaveImage}
              />
            </div>
          ) : (
            <div className='flex justify-end w-full'>
              <Button
                onClick={handleOnRemoveBackground}
                disabled={isProcessing}
              >
                Remove background
              </Button>
            </div>
          )}
        </Footer>
        <EarnCreditsSheet
          showTrigger={false}
          isOpen={isOpenModal}
          onOpenChange={handleOnOpenChange}
        />
      </div>
      {isLoading ? <Overlay /> : null}
    </>
  );
};
