import React, { ReactNode, useCallback } from 'react';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { EventType } from '@/eventType';
import { useTypedDispatch } from '@/app/redux/store';
import {
  FAVICON_TAB,
  IMAGE_OPTIMIZATION_TAB,
  setActiveTab,
} from '@/app/redux/features';
import { AnimatedPage } from '@/app/components';

type Props = {
  children: ReactNode;
};
export const WithDefaultTabSetter = ({ children }: Props) => {
  const dispatch = useTypedDispatch();

  const handleFigmaPluginMessages = useCallback(
    (message: MessageType) => {
      if (message?.type === EventType.OPEN_IMAGES_OPTIMIZATION_TAB) {
        dispatch(setActiveTab(IMAGE_OPTIMIZATION_TAB));
      }

      if (message?.type === EventType.OPEN_FAVICON_EXPORT_TAB) {
        dispatch(setActiveTab(FAVICON_TAB));
      }
    },
    [setActiveTab],
  );

  useWindowMessaging(handleFigmaPluginMessages);

  return <AnimatedPage>{children}</AnimatedPage>;
};
