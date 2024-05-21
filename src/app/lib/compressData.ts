// import pako from 'pako';
const uint8ArrayToBase64 = (data: Uint8Array): string => {
  return btoa(
    data.reduce((acc, current) => acc + String.fromCharCode(current), "")
  );
}

export const compressData = (data: ImageInfo[]) => {
  return data.map(item => ({
    ...item,
    uintArray: uint8ArrayToBase64(item.uintArray),
  }));
}
