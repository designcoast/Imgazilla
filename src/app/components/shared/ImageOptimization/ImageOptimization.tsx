import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';
import { useCallback, useEffect } from 'react';
import { EventType, UIEventType } from '@/eventType';

export const ImageOptimization = () => {
  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message.type === EventType.IMAGES_UINT_ARRAY_COLLECTION) {
      console.log(message.payload)
    }
  }, []);

  const { onSendMessage } = useWindowMessaging(handleFigmaPluginMessages);

  useEffect(() => {
    onSendMessage({
      type: UIEventType.GET_IMAGES_UINT_ARRAY_COLLECTION,
      payload: {}
    })
  }, []);

  return (
    "image optimization"
  )
}