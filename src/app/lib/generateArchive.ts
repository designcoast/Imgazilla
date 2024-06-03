import JSZip from 'jszip';
import { decode } from 'base64-arraybuffer-es6';
import { getHtmlSnippet, getManifestObject } from '@/app/utils/code-template';
import { SUPPORTED_FILE_FORMATS } from '@/app/constants';

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

export const generateImagesArchive = async (items: ImageOptimizationResult[], folderName: string) => {
  const zip = new JSZip();
  const folder = zip.folder(folderName);

  for (const item of items) {
    const { name, base64Image, format, pdfBuffer } = item;
    const fileName = `${name}.${format}`;

    if (SUPPORTED_FILE_FORMATS.includes(format) && pdfBuffer) {
      const buffer = decode(pdfBuffer);
      folder.file(fileName, buffer);
    } else {
      const buffer = decode(base64Image);
      folder.file(fileName, buffer);
    }
  }
  return await zip.generateAsync({ type: 'blob', compressionOptions: { level: 9 }});
}