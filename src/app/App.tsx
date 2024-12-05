import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { withProfiler } from '@sentry/react';

import { ThemeProvider } from '@/app/components/theme-provider';
import { ReduxProvider } from '@/app/redux/provider';
import { AccountStatusChecker } from '@/app/HOC/AccountStatusChecker';
import { BonusModal, Toaster } from '@/app/components';
import { WithDefaultTabSetter } from '@/app/HOC/WithDefaultTabSetter';
import { WithGlobalPluginSettingsProvider } from '@/app/HOC/WithGlobalPluginSettings';
import { initSentry } from '@/app/configs/sentry.config';
import { initMixpanel } from '@/app/configs/mixpanel.config';
import { router } from '@/app/routes';

initSentry();
initMixpanel();

const App = () => {
  return (
    <ReduxProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        enableSystem
        disableTransitionOnChange
      >
        <div className='bg-primary-mainDark h-full'>
          <AccountStatusChecker>
            <WithDefaultTabSetter>
              <WithGlobalPluginSettingsProvider>
                <RouterProvider router={router} />
              </WithGlobalPluginSettingsProvider>
            </WithDefaultTabSetter>
          </AccountStatusChecker>
          <Toaster />
          <BonusModal />
        </div>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default withProfiler(App);
