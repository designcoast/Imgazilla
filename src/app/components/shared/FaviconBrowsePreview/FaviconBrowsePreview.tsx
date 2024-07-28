import React, { useCallback, useMemo, useState } from 'react';
import { ChromePreviewImage, Switch } from '@/app/components';
import { useSelector } from 'react-redux';
import { getFaviconImageData } from '@/app/redux/features';
import { convertToImageUrl } from '@/app/lib/convertToImageUrl';

export const FaviconBrowsePreview = () => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const imageData = useSelector(getFaviconImageData);

  const url = useMemo(() => convertToImageUrl(imageData, 'PNG'), [imageData]);

  console.log('url', url)

  const handleOnThemeChange = useCallback((checked: boolean) => {
    setIsLightTheme(checked);
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mt-6">
        <div className="flex justify-between items-center">
          <p>Browser:</p>
          <Switch
            name="Theme"
            checked={isLightTheme}
            onCheckedChange={handleOnThemeChange}
          />
        </div>
        <div className="flex">
          <ChromePreviewImage imageData={url} />
        </div>
      </div>
      <div className="flex"></div>
    </div>
  )
}