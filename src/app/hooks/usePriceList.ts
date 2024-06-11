import { useState, useEffect, useCallback } from 'react';
import { configureLemonSqueezy } from '@/app/configs/lemonsqueezy.config';
import { createCheckout, listProducts } from '@lemonsqueezy/lemonsqueezy.js';
import { useSelector } from 'react-redux';
import { getAccount } from '@/app/redux/features';
import { useDelay } from '@/app/hooks/useDelay';

const storeID = process.env.LEMONSQUEEZY_STORE_ID;

export const usePriceList = () => {
  const [princeList, setPriceList] = useState<{ price: string, link: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const accountDetails = useSelector(getAccount);

  const onFetchProducts = useCallback(async () => {
    try {
      const { data } = await listProducts({
        filter: { storeId: storeID },
        include: ['variants'],
      });

      const result = await Promise.all(
        data.data.map(async (product) => {
          const checkoutLink = await createCheckout(storeID, product.relationships.variants.data[0].id, {
            checkoutData: {
              custom: {
                figmaUserId: accountDetails.figmaUserID
              }
            }
          });

          return {
            link: checkoutLink.data.data.attributes.url,
            price: product.attributes.price_formatted
          }
        })
      );

      console.log('data', data);
      setPriceList(result);
      setIsLoading(false);
    } catch (err) {
      console.log('Error with payment');
    } finally {
      setIsLoading(false);
    }
  }, [accountDetails]);

  useDelay(async () => {
    await onFetchProducts();
  }, 2000);

  useEffect(() => {
    configureLemonSqueezy();
  }, []);

  return {
    princeList,
    isLoading
  }
}