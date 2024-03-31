import { useCallback, useEffect, useRef } from 'react';

export const useWindowMessaging = (onMessage: (data: any) => void) => {
  const messageRef = useRef<((event: MessageEvent) => void) | null>(null);

  useEffect(() => {
    messageRef.current = (event: { data: {
        pluginMessage: any
      }}) => {
      if (onMessage) {
        onMessage(event?.data?.pluginMessage);
      }
    };

    window.addEventListener('message', messageRef.current);

    return () => {
      window.removeEventListener('message', messageRef.current);
    };
  }, [onMessage]);

  const onSendMessage = useCallback((message: MessageType) => {
    if (!window.parent) {
      return
    }
    window.parent.postMessage({
      pluginMessage: message
    }, '*');
  }, [])

  return { onSendMessage };
};
