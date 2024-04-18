import React from 'react';
import { ThemeProvider } from '@/app/components/theme-provider';
import { RootLayout } from '@/app/layouts/RootLayout';
import { ReduxProvider } from '@/app/redux/provider';
import { AccountStatusChecker } from '@/app/HOC/AccountStatusChecker';
import { Toaster } from '@/app/components';
import { WithDefaultTabSetter } from '@/app/HOC/WithDefaultTabSetter';

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

export default App;