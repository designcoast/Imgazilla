import React, { ReactNode, useCallback, useEffect } from 'react';
import { useLazyCheckAccountQuery } from '@/app/redux/services';
import type { MessageType } from '@/app/components';
import { EventType } from '@/eventType';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { updateAccountInfo } from '@/app/redux/features';

type Props = {
  children: ReactNode
}
export const AccountStatusChecker = ({ children }: Props) => {
  const [onCheckAccount, result] = useLazyCheckAccountQuery();

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message.type === EventType.USER_ACCOUNT_DATA) {
      const { id, name, photoUrl } = message?.payload?.data;
      updateAccountInfo({
        id, name, photoUrl
      });

      onCheckAccount(id)
    }
  }, []);

  useWindowMessaging(handleFigmaPluginMessages);

  useEffect(() => {
    console.log('result', result);
  }, [result])

  return (
    <>{children}</>
  )
};