import React, { ReactNode, useCallback } from 'react';
import { useTypedDispatch } from '@/app/redux/store';

import { EventType } from '@/eventType';

import { setPluginSettings } from '@/app/redux/features';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { AnimatedPage } from '@/app/components';

type Props = {
  children: ReactNode
};

export const WithGlobalPluginSettings = ({ children }: Props) => {
  const dispatch = useTypedDispatch();

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message?.type === EventType.UPDATE_PLUGIN_SETTINGS) {
      dispatch(setPluginSettings(message.payload?.data));
    }
  }, [setPluginSettings]);

  useWindowMessaging(handleFigmaPluginMessages);

  return (
    <AnimatedPage>
      {children}
    </AnimatedPage>
  )
}