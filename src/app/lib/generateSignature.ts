import createHmac from 'create-hmac';
import CryptoJS from 'crypto-js';

const secret = process.env.REQUESTS_SECRET_KEY;

const exceptedEndpoints = ['checkAccount', 'createAccount'];

export const encrypt = (value: string): string => {
  return CryptoJS.AES.encrypt(value, secret).toString();
};

export const generateSignature = (body: any) => {
  const hmac = createHmac('sha256', secret);
  return hmac.update(JSON.stringify(body)).digest('hex');
};

export const prepareHeaders = (headers: Headers, endpoint: string, figmaId: string) => {
  if (!exceptedEndpoints.includes(endpoint)) {
    const encryptedId = encrypt(figmaId);
    headers.set('x-Figma-id', encryptedId);
  }

  const signature = generateSignature(endpoint);
  headers.set('x-Figma-Signature', signature);

  return headers;
};