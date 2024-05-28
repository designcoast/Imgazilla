import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLazyGetOptimizedImageQuery, useLazyGetProcessStatusQuery } from '@/app/redux/services';
import {
  getImageOptimizationJobId,
  setImageOptimizationResult
} from '@/app/redux/features';
import { ImageOptimizationResultList } from '@/app/components';
import { useTypedDispatch } from '@/app/redux/store';

export const ImageOptimizationResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(3000);

  const jobId = useSelector(getImageOptimizationJobId);

  const dispatch = useTypedDispatch();

  const [getProcessStatus, { data }] = useLazyGetProcessStatusQuery({
    pollingInterval,
  });

  const [getOptimizedImage] = useLazyGetOptimizedImageQuery()


  useEffect(() => {
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
          dispatch(setImageOptimizationResult(result));
          setIsLoading(false);
        })
    }
  }, [data, jobId]);

  return (
    <>
      <div className="min-h-[488px]">
        <ImageOptimizationResultList isLoading={isLoading} />
      </div>
    </>
  )
}