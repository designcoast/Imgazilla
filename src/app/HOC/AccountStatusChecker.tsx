import React, { ReactNode, useCallback, useState } from 'react';
import { useCreateAccountMutation, useLazyCheckAccountQuery } from '@/app/redux/services';
import { AnimatedPage, ErrorComponent, Splash } from '@/app/components';
import { EventType } from '@/eventType';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { setAccount } from '@/app/redux/features';
import { isFetchBaseQueryError, isErrorWithMessage } from '@/app/redux/helpers';
import { useTypedDispatch } from '@/app/redux/store';

type Props = {
  children: ReactNode
}
export const AccountStatusChecker = ({ children }: Props) => {
  const [isShowError, setIsShowError] = useState(false);
  const [onCheckAccount, { isLoading }] = useLazyCheckAccountQuery();

  const [createAccount, { isLoading: isCreatingAccount }] = useCreateAccountMutation();

  const dispatch = useTypedDispatch();

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message?.type === EventType.USER_ACCOUNT_DATA) {
      const { id } = message?.payload?.data;

      onCheckAccount(id)
        .unwrap()
        .then((data) => {
          dispatch(setAccount(data));
        })
        .catch((error) => {
          if (isFetchBaseQueryError(error)) {
            if (error.status === 404) {
              createAccount(message?.payload?.data)
                .unwrap()
                .then(() => {
                  onCheckAccount(id)
                    .unwrap()
                    .then((data) => {
                      dispatch(setAccount(data));
                    })
                })
                .catch((error) => {
                  if (isErrorWithMessage(error)) {
                    setIsShowError(true);
                  }
                })
              return
            }
            setIsShowError(true);
          }
        })
    }
  }, []);

  useWindowMessaging(handleFigmaPluginMessages);

  if (isShowError) {
    return (
      <AnimatedPage>
        <ErrorComponent/>
      </AnimatedPage>
    )
  }

  if (isCreatingAccount || isLoading) {
    return (
      <AnimatedPage>
        <Splash />
      </AnimatedPage>
    )
  }

  return (
    <AnimatedPage>
      {children}
    </AnimatedPage>
  )
};