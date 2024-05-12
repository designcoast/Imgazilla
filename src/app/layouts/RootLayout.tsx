import React from 'react';
import { useSelector } from 'react-redux';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  FaviconExporter,
  ImageOptimization, Account,
} from '@/app/components';
import {
  FAVICON_TAB,
  IMAGE_OPTIMIZATION_TAB,
  selectActiveTab,
  selectDisabledTab
} from '@/app/redux/features';

export const RootLayout = () => {
  const { name } = useSelector(selectActiveTab);

  const disabledTab= useSelector(selectDisabledTab);

  const isFaviconTabDisabled = disabledTab?.name === FAVICON_TAB ?? false;
  const isImagesOptimizationTabDisabled = disabledTab?.name === IMAGE_OPTIMIZATION_TAB ?? false;

  return (
    <>
      <div className='flex justify-end p-2.5'>
        <Account />
      </div>
      <Tabs defaultValue={name} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="favicon" disabled={isFaviconTabDisabled}>Favicon exporter</TabsTrigger>
          <TabsTrigger value="imagesOptimization" disabled={isImagesOptimizationTabDisabled}>Image optimisation</TabsTrigger>
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