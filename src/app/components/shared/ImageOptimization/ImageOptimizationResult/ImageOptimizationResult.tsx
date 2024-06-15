import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import { saveAs } from 'file-saver';

import { useLazyGetOptimizedImageQuery, useLazyGetProcessStatusQuery } from '@/app/redux/services';
import {
  getImageOptimizationJobId,
  getImageOptimizationResult,
  setImageOptimizationResult, setImageOptimizationResultPageState
} from '@/app/redux/features';
import { ExportButton, ImageOptimizationResultList, ImageOptimizationResultSettings } from '@/app/components';
import { useTypedDispatch } from '@/app/redux/store';
import { ARCHIVE_NAME_OPTIMIZATION } from '@/app/constants';
import { generateImagesArchive } from '@/app/lib/generateArchive';

export const ImageOptimizationResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(3000);

  const imageOptimizationResult = useSelector(getImageOptimizationResult);
  const jobId = useSelector(getImageOptimizationJobId);

  const dispatch = useTypedDispatch();

  const [getProcessStatus, { data }] = useLazyGetProcessStatusQuery({
    pollingInterval,
  });

  const [getOptimizedImage] = useLazyGetOptimizedImageQuery();

  const handleOnClosePageResult = useCallback(() => {
    dispatch(setImageOptimizationResultPageState({ isOpen: false }))
  }, [dispatch, setImageOptimizationResultPageState]);

  const handleOnDownload = useCallback(async () => {
    const fileName = `${ARCHIVE_NAME_OPTIMIZATION}-${DateTime.now().toFormat('yyyy-MM-dd-HH-mm-ss')}.zip`;
    const blobPath = await generateImagesArchive(imageOptimizationResult, fileName);
    saveAs(blobPath, fileName);
  }, [imageOptimizationResult]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    getProcessStatus(jobId)
    setIsLoading(true);
  }, [jobId]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data?.status === 200) {
      setPollingInterval(0);
      getOptimizedImage(jobId)
        .unwrap()
        .then(({ result }) => {
          dispatch(setImageOptimizationResult({ result }));
          setIsLoading(false);
        })
    }
  }, [data, jobId]);

  return (
    <div className="relative">
      <ImageOptimizationResultSettings onClick={handleOnClosePageResult} isDisabled={isLoading}/>
      <div className="min-h-[515px]">
        <ImageOptimizationResultList isLoading={isLoading}/>
      </div>
      {isLoading ? null : (
        <ExportButton onClick={handleOnDownload}>Download images package</ExportButton>
      )}
    </div>
  )
}