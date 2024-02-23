import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components';

export const NavigationTabs = () => {
  return (
    <Tabs defaultValue="favicon" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="favicon" className="w-full">Favicon exporter</TabsTrigger>
        <TabsTrigger value="image">Image optimisation</TabsTrigger>
      </TabsList>
      <TabsContent value="favicon">
        Favicon exporter
      </TabsContent>
      <TabsContent value="image">
        Image optimisation
      </TabsContent>
    </Tabs>
  )
}