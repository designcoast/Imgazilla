import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import { saveAs } from 'file-saver';

import { useLazyGetOptimizedImageQuery, useLazyGetProcessStatusQuery } from '@/app/redux/services';
import {
  getImageOptimizationJobId,
  getImageOptimizationResult, getSelectedImages,
  setImageOptimizationResult, setImageOptimizationResultPageState
} from '@/app/redux/features';
import { ExportButton, ImageOptimizationResultList, ImageOptimizationResultSettings } from '@/app/components';
import { useTypedDispatch } from '@/app/redux/store';
import { ARCHIVE_NAME_OPTIMIZATION } from '@/app/constants';
import { generateImagesArchive } from '@/app/lib/generateArchive';
import { useSameUUIDs } from '@/app/lib/utils';

export const ImageOptimizationResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(3000);

  const selectedImages = useSelector(getSelectedImages);
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
    const blobPath = await generateImagesArchive(imageOptimizationResult);
    saveAs(blobPath, fileName);
  }, [imageOptimizationResult]);

  const isSameUUIDs = useMemo(() =>
    useSameUUIDs(selectedImages, imageOptimizationResult),
    [selectedImages, imageOptimizationResult]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isSameUUIDs) {
      return
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
    <>
      <ImageOptimizationResultSettings onClick={handleOnClosePageResult} isDisabled={isLoading}/>
      <div className="min-h-[488px]">
        <ImageOptimizationResultList isLoading={isLoading}/>
      </div>
      {isLoading ? null : (
        <ExportButton onClick={handleOnDownload}>Download images package</ExportButton>
      )}
    </>
  )
}