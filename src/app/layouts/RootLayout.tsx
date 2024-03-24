import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  FaviconExporter,
  ImageOptimization, Account,
} from '@/app/components';

export const RootLayout = () => {
  return (
    <>
      <div className='flex justify-end p-2.5'>
        <Account />
      </div>
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
    </>

  )
}