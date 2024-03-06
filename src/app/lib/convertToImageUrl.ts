export const convertToImageUrl = (imageData: Uint8Array) => {
  const blob = new Blob([imageData], { type: 'image/png' });
  return URL.createObjectURL(blob);
}