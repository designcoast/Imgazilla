import React from 'react';
import { ThemeProvider } from '@/app/components/theme-provider';
import { RootLayout } from '@/app/layouts/RootLayout';
import { ReduxProvider } from '@/app/redux/provider';
import { AccountStatusChecker } from '@/app/HOC/AccountStatusChecker';

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
          <RootLayout />
        </AccountStatusChecker>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;