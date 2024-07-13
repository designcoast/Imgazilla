import { useCallback } from 'react';
import * as Sentry from '@sentry/react';

interface AnalyticsEvent {
  eventName: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

export const useSentryAnalytics = () => {
  return useCallback((event: AnalyticsEvent) => {
    const {eventName, category, label, value } = event;

    Sentry.metrics.increment(eventName, value, {
      tags: {
        category,
        label,
      },
    });
  }, []);
};
