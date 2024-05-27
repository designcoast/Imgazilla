import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLazyGetOptimizedImageQuery, useLazyGetProcessStatusQuery } from '@/app/redux/services';
import {
  getImageOptimizationJobId,
  getImageOptimizationResult,
  setImageOptimizationResult
} from '@/app/redux/features';
import { Loading } from '@/app/components';
import { useTypedDispatch } from '@/app/redux/store';

export const ImageOptimizationResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(3000);

  const jobId = useSelector(getImageOptimizationJobId);
  const imageOptimizationResult = useSelector(getImageOptimizationResult);

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

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center items-center min-h-[488px]">
        <Loading />
      </div>
    )
  }

  return (
    <>result</>
  )
}