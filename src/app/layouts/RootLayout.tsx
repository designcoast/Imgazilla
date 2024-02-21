import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components';
// import { useTheme } from "next-themes"

export const RootLayout = () => {
  // const { setTheme } = useTheme();
  return (
    <Tabs defaultValue="favicon" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="favicon">Favicon exporter</TabsTrigger>
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