import { useCallback, useEffect } from 'react';
import mixpanel from 'mixpanel-figma';

interface EventProperties {
  [key: string]: any;
}

export const useMixpanel = (options?: {
  pageName?: string;
  pageProperties?: EventProperties;
}) => {
  useEffect(() => {
    if (options?.pageName) {
      mixpanel.track('Page Viewed', {
        page: options.pageName,
        ...options.pageProperties,
      });
    }
  }, [options]);

  return useCallback((eventName: string, eventProperties?: EventProperties) => {
    mixpanel.track(eventName, eventProperties);
  }, []);
};
