// import pako from 'pako';
const uint8ArrayToBase64 = (data: Uint8Array): string => {
  return btoa(
    data.reduce((acc, current) => acc + String.fromCharCode(current), "")
  );
}

export const transformAndCompressData = (data: ImageInfo[]) => {
  return data.map(item => ({
    uuid: item.uuid,
    extension: item.extension,
    name: item.name,
    optimizationPercent: item.optimizationPercent,
    base64Image: uint8ArrayToBase64(item.uintArray),
  }));
}
