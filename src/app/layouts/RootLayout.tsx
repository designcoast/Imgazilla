import React, { useCallback } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  FaviconExporter,
  ImageOptimization,
  type MessageType
} from '@/app/components';
import { EventType } from '@/eventType';
import { useWindowMessaging } from '@/app/hooks/useFigmaMessaging';

export const RootLayout = () => {
  const handleFigmaPluginMessages = useCallback((message: MessageType) => {
    if (message.type === EventType.USER_ACCOUNT_DATA) {
      console.log('message', message);
    }
  }, []);

  useWindowMessaging(handleFigmaPluginMessages);
  return (
    <Tabs defaultValue="favicon" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="favicon">Favicon exporter</TabsTrigger>
        <TabsTrigger value="image">Image optimisation</TabsTrigger>
      </TabsList>
      <>
        <TabsContent value="favicon">
          <FaviconExporter />
        </TabsContent>
        <TabsContent value="image">
          <ImageOptimization />
        </TabsContent>
      </>
    </Tabs>
  )
}