import React, { ReactNode, useCallback } from 'react';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType } from '@/eventType';
import { useTypedDispatch } from '@/app/redux/store';
import { IMAGE_OPTIMIZATION_TAB, setActiveTab } from '@/app/redux/features';
import { AnimatedPage } from '@/app/components';

type Props = {
  children: ReactNode
};
export const WithDefaultTabSetter = ({ children }: Props) => {

  const dispatch = useTypedDispatch();

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message?.type === EventType.OPEN_IMAGES_OPTIMIZATION_TAB) {
      dispatch(setActiveTab({
        name: IMAGE_OPTIMIZATION_TAB
      }))
    }
  }, []);

  useWindowMessaging(handleFigmaPluginMessages);

  return (
    <AnimatedPage>
      {children}
    </AnimatedPage>
  )
}