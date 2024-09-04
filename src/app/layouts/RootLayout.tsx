import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  FaviconExporter,
  ImageOptimization,
  Account,
} from '@/app/components';
import {
  FAVICON_TAB,
  getActiveTab,
  IMAGE_OPTIMIZATION_TAB,
  selectDisabledTab,
} from '@/app/redux/features';
import { useSentryAnalytics } from '@/app/hooks/useSentryAnalytics';

export const RootLayout = () => {
  const name = useSelector(getActiveTab);

  const sendAnalyticsEvent = useSentryAnalytics();

  const disabledTab = useSelector(selectDisabledTab);

  const isFaviconTabDisabled = disabledTab?.name === FAVICON_TAB ?? false;
  const isImagesOptimizationTabDisabled =
    disabledTab?.name === IMAGE_OPTIMIZATION_TAB ?? false;

  const handleOnFaviconTabClick = useCallback(() => {
    sendAnalyticsEvent({
      eventName: 'button_click',
      category: 'user_interaction',
      label: 'favicon_tab',
      value: 1,
    });
  }, []);

  const handleOnImagesTabClick = useCallback(() => {
    sendAnalyticsEvent({
      eventName: 'button_click',
      category: 'user_interaction',
      label: 'images_optimization_tab',
      value: 1,
    });
  }, []);

  return (
    <>
      <div className='flex justify-end p-2.5'>
        <Account />
      </div>
      <Tabs defaultValue={name} className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger
            value='favicon'
            disabled={isFaviconTabDisabled}
            onClick={handleOnFaviconTabClick}
          >
            Favicon exporter
          </TabsTrigger>
          <TabsTrigger
            value='imagesOptimization'
            disabled={isImagesOptimizationTabDisabled}
            onClick={handleOnImagesTabClick}
          >
            Image optimization
          </TabsTrigger>
        </TabsList>
        <>
          <TabsContent value='favicon'>
            <FaviconExporter />
          </TabsContent>
          <TabsContent value='imagesOptimization'>
            <ImageOptimization />
          </TabsContent>
        </>
      </Tabs>
    </>
  );
};
