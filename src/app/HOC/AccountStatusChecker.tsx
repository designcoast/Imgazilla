import React, { ReactNode, useCallback } from 'react';
import { useCreateAccountMutation, useLazyCheckAccountQuery } from '@/app/redux/services';
import type { MessageType } from '@/app/components';
import { EventType } from '@/eventType';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { setAccount } from '@/app/redux/features';
import { isFetchBaseQueryError, isErrorWithMessage } from '@/app/redux/helpers';
import { useTypedDispatch } from '@/app/redux/store';
import { useToast } from '@/app/hooks/useToast';

type Props = {
  children: ReactNode
}
export const AccountStatusChecker = ({ children }: Props) => {
  const [onCheckAccount, { isError, isLoading }] = useLazyCheckAccountQuery();
  const [createAccount, { isLoading: isCreatingAccount, isError: isCreatingAccountError }] = useCreateAccountMutation();
  const { toast } = useToast();

  const dispatch = useTypedDispatch();

  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message.type === EventType.USER_ACCOUNT_DATA) {
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
                .catch((error) => {
                  if (isErrorWithMessage(error)) {
                    toast({
                      title: 'Error while creating account',
                      description: error.message,
                    })
                  }
                })
            }
          }
        })
    }
  }, []);

  useWindowMessaging(handleFigmaPluginMessages);

  //TODO: Update these conditions

  if (isError || isCreatingAccountError) {
    return 'Error creating account'
  }

  if (isLoading) {
    return 'Account loading'
  }

  if (isCreatingAccount) {
    return 'Create Account loading';
  }

  return (
    <>{children}</>
  )
};