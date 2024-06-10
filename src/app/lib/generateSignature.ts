import createHmac from 'create-hmac';

const secret = process.env.REQUESTS_SECRET_KEY;

export const generateSignature = (body: any) => {
  const hmac = createHmac('sha256', secret);
  return hmac.update(JSON.stringify(body)).digest('hex');
};

export const prepareHeaders = (headers: any, body: any) => {
  const signature = generateSignature(body);
  headers.set('x-Figma-Signature', signature);
  return headers;
};