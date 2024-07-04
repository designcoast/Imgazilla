import React from 'react';
import * as Sentry from '@sentry/react';

import { ThemeProvider } from '@/app/components/theme-provider';
import { RootLayout } from '@/app/layouts/RootLayout';
import { ReduxProvider } from '@/app/redux/provider';
import { AccountStatusChecker } from '@/app/HOC/AccountStatusChecker';
import { Toaster } from '@/app/components';
import { WithDefaultTabSetter } from '@/app/HOC/WithDefaultTabSetter';

Sentry.init({
  dsn: process.env.SENTRY_DSN_LINK,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const App = () => {
  return (
    <ReduxProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <AccountStatusChecker>
          <WithDefaultTabSetter>
            <RootLayout />
          </WithDefaultTabSetter>
        </AccountStatusChecker>
        <Toaster />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default Sentry.withProfiler(App);