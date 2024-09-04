import React, { useCallback } from 'react';

import {
  Account,
  FaviconExporter,
  ImageOptimization,
  Navigation,
} from '@/app/components';
import { APP_ROUTES, FAVICON_EXPORT, IMAGE_OPTIMIZATION } from '@/app/routes';
import { useSentryAnalytics } from '@/app/hooks/useSentryAnalytics';

export const ModernLayout = () => {
  const ROUTE_KEYS = Object.keys(APP_ROUTES);

  const sendAnalyticsEvent = useSentryAnalytics();

  const handleOnTabClick = useCallback((type: string) => {
    sendAnalyticsEvent({
      eventName: 'button_click',
      category: 'user_interaction',
      label:
        type === FAVICON_EXPORT ? 'favicon_tab' : 'images_optimization_tab',
      value: 1,
    });
  }, []);

  return (
    <div className='flex p-3 h-full w-full'>
      <Navigation defaultValue={ROUTE_KEYS[0]}>
        <div className='flex justify-center gap-1.5'>
          <Navigation.List>
            {Object.keys(APP_ROUTES).map((item, index) => (
              <Navigation.Item
                key={index}
                value={item}
                onClick={() => handleOnTabClick(item)}
              >
                {APP_ROUTES[item]}
              </Navigation.Item>
            ))}
          </Navigation.List>
          <Account />
        </div>
        <div className='flex mt-2 h-full w-full'>
          <Navigation.Content value={FAVICON_EXPORT}>
            <FaviconExporter />
          </Navigation.Content>
          <Navigation.Content value={IMAGE_OPTIMIZATION}>
            <ImageOptimization />
          </Navigation.Content>
        </div>
      </Navigation>
    </div>
  );
};
