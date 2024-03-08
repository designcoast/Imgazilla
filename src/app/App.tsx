import React from 'react';
import { ThemeProvider } from '@/app/components/theme-provider';
import { RootLayout } from '@/app/layouts/RootLayout';
import { ReduxProvider } from '@/app/redux/provider';

const App = () => {
  return (
    <ReduxProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <RootLayout />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;