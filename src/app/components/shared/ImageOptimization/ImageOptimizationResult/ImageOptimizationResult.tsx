import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import { toast } from 'sonner';
import { saveAs } from 'file-saver';

import {
  useLazyGetAccountCreditsQuery,
  useLazyGetOptimizedImageQuery,
  useLazyGetProcessStatusQuery,
} from '@/app/redux/services';
import {
  getImageOptimizationJobId,
  getImageOptimizationResult,
  setImageOptimizationResult,
  setImageOptimizationResultPageState,
  updateAccountCredits,
} from '@/app/redux/features';
import {
  ExportButton,
  ImageOptimizationResultList,
  ImageOptimizationResultSettings,
} from '@/app/components';
import { useTypedDispatch } from '@/app/redux/store';
import { ANALYTIC_EVENTS, ARCHIVE_NAME_OPTIMIZATION } from '@/app/constants';
import { generateImagesArchive } from '@/app/lib/generateArchive';
import { useMixpanel } from '@/app/hooks/useMixpanleAnalytics';

export const ImageOptimizationResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(3000);

  const imageOptimizationResult = useSelector(getImageOptimizationResult);
  const jobId = useSelector(getImageOptimizationJobId);

  const trackClick = useMixpanel();

  const dispatch = useTypedDispatch();

  const [getProcessStatus, { data }] = useLazyGetProcessStatusQuery({
    pollingInterval,
  });

  const [getOptimizedImage] = useLazyGetOptimizedImageQuery();
  const [getAccountCredits] = useLazyGetAccountCreditsQuery();

  const handleOnClosePageResult = useCallback(() => {
    dispatch(setImageOptimizationResultPageState({ isOpen: false }));
    dispatch(setImageOptimizationResult({ result: [] }));
  }, [dispatch, setImageOptimizationResultPageState]);

  const handleOnDownload = useCallback(async () => {
    const fileName = `${ARCHIVE_NAME_OPTIMIZATION}-${DateTime.now().toFormat('yyyy-MM-dd-HH-mm-ss')}.zip`;

    trackClick('click', {
      name: ANALYTIC_EVENTS.DOWNLOAD_IMAGES_ARCHIVE,
    });

    const blobPath = await generateImagesArchive(
      imageOptimizationResult,
      fileName,
    );
    saveAs(blobPath, fileName);
  }, [imageOptimizationResult]);

  useEffect(() => {
    if (isLoading || imageOptimizationResult.length > 0) {
      return;
    }

    getProcessStatus(jobId);
    setIsLoading(true);
  }, [jobId, imageOptimizationResult]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (imageOptimizationResult.length > 0) {
      return;
    }

    if (data?.status === 200) {
      setPollingInterval(0);
      getOptimizedImage(jobId)
        .unwrap()
        .then(({ result }) => {
          dispatch(setImageOptimizationResult({ result }));
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
          handleOnClosePageResult();
        });
    }
  }, [data, jobId]);

  return (
    <div className='flex flex-col relative w-full'>
      <ImageOptimizationResultSettings
        onClick={handleOnClosePageResult}
        isDisabled={isLoading}
      />
      <ImageOptimizationResultList isLoading={isLoading} />
      <ExportButton onClick={handleOnDownload} isDisabled={isLoading}>
        Download images package
      </ExportButton>
    </div>
  );
};
