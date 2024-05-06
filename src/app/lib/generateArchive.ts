import JSZip from 'jszip';
import { getHtmlSnippet, getManifestObject } from '@/app/utils/code-template';

export interface ImageObject {
  name: string;
  buffer: {
    type: string;
    data: Uint8Array
  };
}

type GenerateArchive = {
  images: ImageObject[],
  websiteName?: string,
  themeColor: string,
  isAndroid: boolean,
  isIOS: boolean
}

export const generateArchive = async ({
  websiteName,
  themeColor,
  images,
  isIOS,
  isAndroid
}: GenerateArchive): Promise<Blob> => {
  const zip = new JSZip();

  for (const image of images) {
    const { name, buffer } = image;

    zip.file(name, buffer.data);
  }

  console.log('isAndroid', isAndroid);

  if (isAndroid) {
    const manifest = getManifestObject({
      websiteName,
      themeColor
    });

    zip.file('manifest.json', JSON.stringify(manifest, null, 2));
  }

  const html = getHtmlSnippet({ isAndroid, color: themeColor, websiteName, isIOS });

  zip.file('head.html', html.join(''))

  return await zip.generateAsync({ type: 'blob', compressionOptions: { level: 9 }});
}