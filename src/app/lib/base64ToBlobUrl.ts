import { convertToImageUrl } from '@/app/lib/convertToImageUrl';

export const base64ToBlobUrl = (base64: string, type: string): string => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return convertToImageUrl(byteArray, type);
};
