import JSZip from 'jszip';

interface ImageObject {
  name: string;
  buffer: {
    type: string;
    data: Uint8Array
  };
}

export const saveImagesToZip = async (images: ImageObject[]): Promise<Blob> => {
  const zip = new JSZip();

  for (const image of images) {
    const { name, buffer } = image;

    zip.file(name, buffer.data);
  }

  return await zip.generateAsync({ type: 'blob', compressionOptions: { level: 9 }});
}