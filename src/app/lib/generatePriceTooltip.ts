const IMAGE_CREDITS_COST = process.env.IMAGE_CREDITS_COST;
const FAVICON_ARCHIVE_CREDITS_COST = process.env.FAVICON_ARCHIVE_CREDITS_COST;
const BACKGROUND_REMOVAL_COST = process.env.BACKGROUND_REMOVAL_COST;

export const generateTooltip = (credits: number): string => {
  const faviconCount = credits / parseInt(FAVICON_ARCHIVE_CREDITS_COST);
  const optimizationCount = credits / parseInt(IMAGE_CREDITS_COST);
  const backgroundRemovalCount = credits / parseInt(BACKGROUND_REMOVAL_COST);

  return `You can export ${faviconCount} archive${faviconCount > 1 ? 's' : ''} with favicon or ${optimizationCount} archives with images or remove background from ${backgroundRemovalCount} image${backgroundRemovalCount > 1 ? 's' : ''}.`;
};
