import React, { ReactNode, useCallback } from 'react';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType } from '@/eventType';
// import { AnimatedPage, Splash } from '@/app/components';

type Props = {
  children: ReactNode
};
export const WithDefaultTabSetter = ({ children }: Props) => {

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message.type === EventType.OPEN_IMAGES_OPTIMIZATION_TAB) {
      console.log('here');
    }
  }, []);

  useWindowMessaging(handleFigmaPluginMessages);

  return (
    <>{children}</>
  )
}