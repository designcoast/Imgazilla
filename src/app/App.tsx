import React from 'react';
import { ThemeProvider } from '@/app/components/theme-provider';
import { RootLayout } from '@/app/layouts/RootLayout';

const App = () => {
  return (
    <ThemeProvider
      enableSystem
    >
      <RootLayout />
    </ThemeProvider>
  );
}

export default App;


// const textbox = React.useRef<HTMLInputElement>(undefined);
//
// const countRef = React.useCallback((element: HTMLInputElement) => {
//   if (element) element.value = '5';
//   textbox.current = element;
// }, []);
//
// const onCreate = () => {
//   const count = parseInt(textbox.current.value, 10);
//   parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
// };
//
// const onCancel = () => {
//   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
// };
//
// React.useEffect(() => {
//   // This is how we read messages sent from the plugin controller
//   window.onmessage = (event) => {
//     const { type, message } = event.data.pluginMessage;
//     if (type === 'create-rectangles') {
//       console.log(`Figma Says: ${message}`);
//     }
//   };
// }, []);