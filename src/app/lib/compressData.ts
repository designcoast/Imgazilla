import pako from 'pako';

export const compressData = (data: ImageInfo[]) => {
  const compressed = pako.deflate(JSON.stringify(data));
  return new Blob([compressed]);
}
