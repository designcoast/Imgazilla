import React from 'react';
import { FaviconSettingsForm } from '@/app/components';
export const FaviconExporterSettings = () => {

  return (
    <>
      <div className="m-8 mb-1.5">
        <p className="font-bold">Customise</p>
        <FaviconSettingsForm/>
      </div>
      <button className="flex justify-center w-full bg-exportButtonBGColor text-center p-[9.6px]">Export</button>
    </>
  )
}