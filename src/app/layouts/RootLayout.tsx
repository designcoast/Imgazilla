import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  FaviconExporter,
  ImageOptimization, Account,
} from '@/app/components';
import { getSelectedTab } from '@/app/redux/features';
import { useSelector } from 'react-redux';

export const RootLayout = () => {
  const activeTab = useSelector(getSelectedTab);
  return (
    <>
      <div className='flex justify-end p-2.5'>
        <Account />
      </div>
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="favicon">Favicon exporter</TabsTrigger>
          <TabsTrigger value="imagesOptimization">Image optimisation</TabsTrigger>
        </TabsList>
        <>
          <TabsContent value="favicon">
            <FaviconExporter />
          </TabsContent>
          <TabsContent value="imagesOptimization">
            <ImageOptimization />
          </TabsContent>
        </>
      </Tabs>
    </>

  )
}