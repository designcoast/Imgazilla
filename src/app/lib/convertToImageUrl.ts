import { FORMAT_TO_MIME_TYPE } from '@/app/constants';

export const convertToImageUrl = (imageData: Uint8Array, format: string) => {
  const blob = new Blob([imageData], { type: FORMAT_TO_MIME_TYPE[format] });
  return URL.createObjectURL(blob);
};
