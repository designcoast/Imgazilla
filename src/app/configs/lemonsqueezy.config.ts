
import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

export const configureLemonSqueezy = () => {
  lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY,
    onError: (error) => {
      throw new Error(`Lemon Squeezy API error: ${error.message}`);
    },
  });
}


