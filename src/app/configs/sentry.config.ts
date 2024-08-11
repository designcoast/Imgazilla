import { init, browserTracingIntegration, replayIntegration } from '@sentry/react';

export const initSentry = () => {
  init({
    dsn: process.env.SENTRY_DSN_LINK,
    environment: process.env.NODE_ENV,
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      browserTracingIntegration(),
      replayIntegration(),
    ],
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}