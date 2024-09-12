import React, { useCallback } from 'react';
import { ImageOptimizationPanelItem, MainContainer } from '@/app/components';

import { useMixpanel } from '@/app/hooks/useMixpanleAnalytics';
import {
  APP_ROUTES_PATHS,
  PAGE_IMAGES_OPTIMIZATION,
  SELECT_IMAGES_OPTIMIZATION,
} from '@/app/constants';

export const ImageOptimizationPanel = () => {
  const onTrackClick = useMixpanel();

  const handleOnClick = useCallback((name: string) => {
    onTrackClick('click', {
      name,
    });
  }, []);

  return (
    <MainContainer className='h-full w-full justify-center items-center gap-3'>
      <ImageOptimizationPanelItem
        title='Optimize images on Page'
        description='Find all images with settings, it may take some time.'
        to={`/${APP_ROUTES_PATHS[PAGE_IMAGES_OPTIMIZATION]}`}
        onClick={() => handleOnClick(PAGE_IMAGES_OPTIMIZATION)}
      />
      <ImageOptimizationPanelItem
        title='Optimize selected images'
        description='Please select images before trying this option.'
        to={`/${APP_ROUTES_PATHS[SELECT_IMAGES_OPTIMIZATION]}`}
        onClick={() => handleOnClick(SELECT_IMAGES_OPTIMIZATION)}
      />
    </MainContainer>
  );
};
