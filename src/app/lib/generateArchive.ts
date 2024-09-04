import JSZip from 'jszip';
import { decode } from 'base64-arraybuffer-es6';
import { getHtmlSnippet, getManifestObject } from '@/app/utils/code-template';

export interface ImageObject {
  name: string;
  buffer: {
    type: string;
    data: Uint8Array;
  };
}

type GenerateArchive = {
  images: ImageObject[];
  websiteName?: string;
  themeColor: string;
  isAndroid: boolean;
  isIOS: boolean;
};

export const generateArchive = async ({
  websiteName,
  themeColor,
  images,
  isIOS,
  isAndroid,
}: GenerateArchive): Promise<Blob> => {
  const zip = new JSZip();

  for (const image of images) {
    const { name, buffer } = image;

    zip.file(name, buffer.data);
  }

  if (isAndroid) {
    const manifest = getManifestObject({
      websiteName,
      themeColor,
    });

    zip.file('manifest.json', JSON.stringify(manifest, null, 2));
  }

  const html = getHtmlSnippet({
    isAndroid,
    color: themeColor,
    websiteName,
    isIOS,
  });

  zip.file('head.html', html.join(''));

  return await zip.generateAsync({
    type: 'blob',
    compressionOptions: { level: 9 },
  });
};

export const generateImagesArchive = async (
  items: ImageOptimizationResult[],
  folderName: string,
) => {
  const zip = new JSZip();
  const folder = zip.folder(folderName);
  const nameCountMap: { [key: string]: number } = {};

  for (const item of items) {
    const { name, base64Image, format, pdfBuffer } = item;
    let fileName = `${name}.${format}`;
    const originName = `${name}.${format}`;

    if (nameCountMap[originName]) {
      fileName = `${name}(${nameCountMap[fileName]}).${format}`;
      nameCountMap[originName] += 1;
    } else {
      nameCountMap[originName] = 1;
    }

    const buffer = pdfBuffer ? decode(pdfBuffer) : decode(base64Image);
    folder.file(fileName, buffer);
  }

  return await zip.generateAsync({
    type: 'blob',
    compressionOptions: { level: 9 },
  });
};
