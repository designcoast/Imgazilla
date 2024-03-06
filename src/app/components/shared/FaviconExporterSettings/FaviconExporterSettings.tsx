import React, { useCallback, useEffect, useState } from 'react';
import { useFigmaMessaging } from '@/app/hooks/useFigmaMessaging';

export const FaviconExporterSettings = () => {
  const [imageUrl] = useState<string | null>(null);
  const messaging = useFigmaMessaging();

  const handlePluginMessage = useCallback((message) => {
    console.log("Message from plugin:", message);
  }, []);

  const handleClick = useCallback(() => {
    const message = {
      type: "my-custom-message",
      payload: {
        value: "Hello from Figma!",
      },
    };

    try {
      messaging.sendMessage(message);
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, []);

  useEffect(() => messaging.subscribe(handlePluginMessage), [messaging, handlePluginMessage]);

  return (
    <div>
      <img src={imageUrl} alt={'Image from data'}/>
      <button onClick={handleClick}>send</button>
    </div>
  )
}