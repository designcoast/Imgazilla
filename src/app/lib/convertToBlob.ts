export const convertToBlob = (uint8Array: Uint8Array) =>
  new Blob([uint8Array], { type: 'application/octet-stream' });
