import React, { useCallback } from 'react';
import { Button } from '@/app/components';

interface SaveImageProps {
  base64Image: string;
  name: string;
  onClick?: () => void;
}

export const SaveImage: React.FC<SaveImageProps> = ({
  base64Image,
  name,
  onClick,
}) => {
  const onSaveImageToFile = useCallback(() => {
    onClick();

    const byteString = atob(base64Image.split(',')[1]);
    const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];

    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: mimeString });

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }, [base64Image]);

  return <Button onClick={onSaveImageToFile}>Download</Button>;
};
