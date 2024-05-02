import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { saveAs } from 'file-saver';
import { DateTime } from 'luxon';

import { FaviconExporterSheet, FaviconSettingsForm, FormDataType, Overlay } from '@/app/components';

import { useTypedDispatch } from '@/app/redux/store';
import { getFaviconImageData, updateFaviconSettings } from '@/app/redux/features';
import { useGenerateFaviconMutation } from '@/app/redux/services';
import { convertToBlob } from '@/app/lib/convertToBlob';
import { saveImagesToZip } from '@/app/lib/saveImagesToZip';
import { ARCHIVE_NAME } from '@/app/constants';

export const FaviconExporterSettings = () => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [blobPath, setBlobPath] = useState<Blob>();
  const imageData = useSelector(getFaviconImageData);

  const [generateFavicon, { isLoading, isError, isSuccess }] = useGenerateFaviconMutation();

  const fileName = useMemo(() => `${ARCHIVE_NAME}-${DateTime.now().toFormat('yyyy-MM-dd-HH-mm-ss')}.zip`, [DateTime]);

  const dispatch = useTypedDispatch();

  const generateArchive = useCallback(async (data) => {
    const blob = await saveImagesToZip(data);
    setBlobPath(blob);
  }, []);

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
      .then(generateArchive)

    dispatch(updateFaviconSettings({
      faviconSettings: data
    }))
  }, [imageData]);

  const handleOnOpenChange = useCallback((open: boolean) => {
    setIsOpenSheet(open);
  }, []);


  const handleOnDownload = useCallback(() => saveAs(blobPath, fileName), [blobPath, fileName]);

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
      <FaviconExporterSheet open={isOpenSheet} onOpenChange={handleOnOpenChange} onDownload={handleOnDownload} />
      {isLoading ? (
        <Overlay />
      ) : null}
    </>
  )
}
