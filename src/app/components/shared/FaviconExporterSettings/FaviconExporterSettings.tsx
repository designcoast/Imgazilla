import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FaviconExporterSheet, FaviconSettingsForm, FormDataType, Overlay } from '@/app/components';

import { useTypedDispatch } from '@/app/redux/store';
import { getFaviconImageData, updateFaviconSettings } from '@/app/redux/features';
import { useGenerateFaviconMutation } from '@/app/redux/services';
import { convertToBlob } from '@/app/lib/convertToBlob';

export const FaviconExporterSettings = () => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const imageData = useSelector(getFaviconImageData);

  const [generateFavicon, { isLoading, isError, isSuccess }] = useGenerateFaviconMutation();

  const dispatch = useTypedDispatch();

  const handleOnSubmit = useCallback((data: FormDataType) => {
    const blob = convertToBlob(imageData);

    const formData = new FormData();
    formData.append('image', blob);
    formData.append('websiteName', data.websiteName);
    formData.append('themeColor', data.themeColor);
    formData.append('platforms[default]', data.platforms.default.toString());
    formData.append('platforms[ios]', data.platforms.ios.toString());
    formData.append('platforms[android]', data.platforms.android.toString());

    generateFavicon(formData)
      .unwrap()
      .then((data) => {
        console.log('data', data);
      })

    dispatch(updateFaviconSettings({
      faviconSettings: data
    }))
  }, [imageData]);

  const handleOnOpenChange = useCallback((open: boolean) => {
    setIsOpenSheet(open);
  }, []);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    setIsOpenSheet(true);
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    console.log('LOGGER: ')
  }, [isError])

  return (
    <>
      <div className="m-8 mb-1.5">
        <p className="font-bold">Customise</p>
      </div>
      <FaviconSettingsForm onSubmit={handleOnSubmit}/>
      <FaviconExporterSheet open={isOpenSheet} onOpenChange={handleOnOpenChange}/>
      {isLoading ? (
        <Overlay />
      ) : null}
    </>
  )
}
