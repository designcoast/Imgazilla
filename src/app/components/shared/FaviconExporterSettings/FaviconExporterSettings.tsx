import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { saveAs } from 'file-saver';
import { DateTime } from 'luxon';
import { encode } from 'base64-arraybuffer-es6';
import { toast, } from 'sonner';

import { EarnCreditsModal, FaviconExporterSheet, FaviconSettingsForm, FormDataType, Overlay } from '@/app/components';

import { useTypedDispatch } from '@/app/redux/store';
import { getFaviconImageData, updateAccountCredits, updateFaviconSettings } from '@/app/redux/features';
import { useGenerateFaviconMutation, useLazyGetAccountCreditsQuery } from '@/app/redux/services';

import { generateArchive, type ImageObject } from '@/app/lib/generateArchive';
import { ARCHIVE_NAME } from '@/app/constants';
import { useSentryAnalytics } from '@/app/hooks/useSentryAnalytics';

export const FaviconExporterSettings = () => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [blobPath, setBlobPath] = useState<Blob>();
  const imageData = useSelector(getFaviconImageData);

  const [generateFavicon, { isLoading }] = useGenerateFaviconMutation();
  const [getAccountCredits] = useLazyGetAccountCreditsQuery();

  const sendAnalyticsEvent = useSentryAnalytics();

  const dispatch = useTypedDispatch();

  const onGenerateArchive = useCallback(async (images: ImageObject[], formState: FormDataType) => {
    const { websiteName, themeColor, platforms: { android, ios } } = formState;
    const blob = await generateArchive({
      websiteName,
      themeColor,
      images,
      isAndroid: android,
      isIOS: ios
    });
    setBlobPath(blob);
  }, []);

  const handleOnSubmit = useCallback((data: FormDataType) => {
    const result = {
      image: encode(imageData),
      ...data,
    }
    generateFavicon(result)
      .unwrap()
      .then(async (images: ImageObject[]) => {
        await onGenerateArchive(images, data);

        getAccountCredits('')
          .unwrap()
          .then((credits: string) => {
            dispatch(updateAccountCredits({ credits }));
          }).finally(() => {
          setIsOpenSheet(true);
        })
      }).catch((error) => {
        toast.info('Error while generating favicon', {
          description: error?.data?.message,
          action: {
            label: 'Purchase',
            onClick: () => setIsOpenModal(true)
          },
          duration: 5000
        });
    })

    dispatch(updateFaviconSettings({
      faviconSettings: data
    }))
  }, [imageData, onGenerateArchive]);

  const handleOnOpenChange = useCallback((open: boolean) => {
    setIsOpenSheet(open);
  }, []);

  const handleOnDownload = useCallback(() => {
    const fileName = `${ARCHIVE_NAME}-${DateTime.now().toFormat('yyyy-MM-dd-HH-mm-ss')}.zip`;

    sendAnalyticsEvent({
      eventName: 'button_click',
      category: 'user_interaction',
      label: 'download_favicon_archive',
      value: 1,
    });

    saveAs(blobPath, fileName);
  }, [blobPath]);

  return (
    <>
      <div className="m-8 mb-1.5">
        <p className="font-bold">Customise</p>
      </div>
      <FaviconSettingsForm onSubmit={handleOnSubmit}/>
      <EarnCreditsModal showTrigger={false} isOpen={isOpenModal} />
      <FaviconExporterSheet open={isOpenSheet} onOpenChange={handleOnOpenChange} onDownload={handleOnDownload} />
      {isLoading ? (
        <Overlay />
      ) : null}
    </>
  )
}
