interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Extracts the dimensions of a PNG image from a Uint8Array containing the image data.
 * @param data Uint8Array containing the raw PNG data.
 * @returns An object with the width and height of the image.
 */
export const extractPngDimensions = (data: Uint8Array): ImageDimensions => {
  // Verify PNG signature
  const pngSignature = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  for (let i = 0; i < pngSignature.length; i++) {
    if (data[i] !== pngSignature[i]) {
      throw new Error('Invalid PNG file.');
    }
  }

  // IHDR chunk starts at byte 8, after the 8-byte signature
  // Length of IHDR data is always 13 bytes, so we skip to byte 16 for the start of the IHDR chunk type
  const ihdrStart = 8 + 4; // Start after the length field
  const chunkType = String.fromCharCode(...data.slice(ihdrStart, ihdrStart + 4));
  if (chunkType !== 'IHDR') {
    throw new Error('IHDR chunk not found at expected position.');
  }

  // Width starts at byte 16 and height starts at byte 20
  const width = data[16] * 256 * 256 * 256 + data[17] * 256 * 256 + data[18] * 256 + data[19];
  const height = data[20] * 256 * 256 * 256 + data[21] * 256 * 256 + data[22] * 256 + data[23];

  return { width, height };
}