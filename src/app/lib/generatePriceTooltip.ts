const IMAGE_CREDITS_COST = process.env.IMAGE_CREDITS_COST;
const FAVICON_ARCHIVE_CREDITS_COST = process.env.FAVICON_ARCHIVE_CREDITS_COST;

export const generateTooltip = (credits: number): string => {
  const faviconCount = credits / parseInt(FAVICON_ARCHIVE_CREDITS_COST);
  const optimizationCount = credits / parseInt(IMAGE_CREDITS_COST);

  return `You can export ${faviconCount} archive${faviconCount > 1 ? 's' : ''} with favicon or optimize ${optimizationCount} images`;
};
