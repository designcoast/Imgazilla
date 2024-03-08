import React, { useCallback } from 'react';
import { FaviconSettingsForm, FormData } from '@/app/components';
export const FaviconExporterSettings = () => {

  const handleOnSubmit = useCallback((data: FormData) => {
    console.log('data', data);
  }, []);

  return (
    <>
      <div className="m-8 mb-1.5">
        <p className="font-bold">Customise</p>
      </div>
      <FaviconSettingsForm onSubmit={handleOnSubmit} />
    </>
  )
}