import { useState, useEffect, useCallback } from 'react';
import { configureLemonSqueezy } from '@/app/configs/lemonsqueezy.config';
import { createCheckout, listProducts } from '@lemonsqueezy/lemonsqueezy.js';
import { useSelector } from 'react-redux';
import { getAccount } from '@/app/redux/features';
import { useDelay } from '@/app/hooks/useDelay';
import { generateTooltip } from '@/app/lib/generatePriceTooltip';

const storeID = process.env.LEMONSQUEEZY_STORE_ID;

export const usePriceList = () => {
  const [princeList, setPriceList] = useState<{ price: string, link: string, credits: number, tooltip: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const accountDetails = useSelector(getAccount);

  const onFetchProducts = useCallback(async () => {
    try {
      const { data } = await listProducts({
        filter: { storeId: storeID },
        include: ['variants'],
      });

      const result = await Promise.all(
        data.data.flatMap(async (product) => {
          return Promise.all(
            product.relationships.variants.data.map(async (variantRelationship) => {
              // Find the corresponding variant in the included section
              const variant = data.included.find(
                (item) => item.type === 'variants' && item.id === variantRelationship.id
              );

              if (!variant) {
                throw new Error(`Variant with ID ${variantRelationship.id} not found`);
              }

              // Only process published variants
              if (variant.attributes.status !== 'published') {
                return null;
              }

              // Extract the amount of credits from the variant name
              const creditsMatch = (variant.attributes.name as string).match(/(\d+)\s*credits?/i);
              const credits = creditsMatch ? parseInt(creditsMatch[1], 10) : 0;

              // Format the price
              const priceFormatted = (variant.attributes.price as number / 100).toFixed(2);

              const tooltip = generateTooltip(credits);

              const checkoutLink = await createCheckout(storeID, variant.id, {
                checkoutData: {
                  custom: {
                    figmaUserId: accountDetails.figmaUserID,
                  },
                },
              });

              return {
                link: checkoutLink.data.data.attributes.url,
                price: priceFormatted,
                credits,
                tooltip
              };
            })
          );
        })
      );

      // Flatten the result array
      const flattenedResult = result.flat().filter(item => item !== null);

      setPriceList(flattenedResult);
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