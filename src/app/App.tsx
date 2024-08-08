import React from 'react';
import { withProfiler } from '@sentry/react';

import { ThemeProvider } from '@/app/components/theme-provider';
import { ModernLayout } from '@/app/layouts/ModernLayout';
import { ReduxProvider } from '@/app/redux/provider';
import { AccountStatusChecker } from '@/app/HOC/AccountStatusChecker';
import { Toaster } from '@/app/components';
import { WithDefaultTabSetter } from '@/app/HOC/WithDefaultTabSetter';
import { WithGlobalPluginSettingsProvider } from '@/app/HOC/WithGlobalPluginSettings';
import { initSentry } from '@/app/configs/sentry.config';

initSentry();

const App = () => {
  return (
    <ReduxProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="bg-primary-mainDark h-full">
          <AccountStatusChecker>
            <WithDefaultTabSetter>
              <WithGlobalPluginSettingsProvider>
                <ModernLayout />
              </WithGlobalPluginSettingsProvider>
            </WithDefaultTabSetter>
          </AccountStatusChecker>
          <Toaster />
        </div>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default withProfiler(App);