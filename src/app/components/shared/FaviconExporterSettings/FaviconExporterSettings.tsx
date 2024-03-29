import React, { useCallback, useState } from 'react';
import { FaviconExporterSheet, FaviconSettingsForm, FormData } from '@/app/components';

import { useTypedDispatch } from '@/app/redux/store';
import { updateFaviconSettings } from '@/app/redux/features';

export const FaviconExporterSettings = () => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const dispatch = useTypedDispatch()

  const handleOnSubmit = useCallback((data: FormData) => {
    dispatch(updateFaviconSettings({
      faviconSettings: data
    }))
  }, []);

  return (
    <>
      <div className="m-8 mb-1.5">
        <p className="font-bold">Customise</p>
      </div>
      <FaviconSettingsForm onSubmit={handleOnSubmit} />
      <FaviconExporterSheet open={isOpenSheet} />
    </>
  )
}