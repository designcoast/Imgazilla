const IMAGE_CREDITS_COST = process.env.IMAGE_CREDITS_COST;
const FAVICON_ARCHIVE_CREDITS_COST = process.env.FAVICON_ARCHIVE_CREDITS_COST;
const BACKGROUND_REMOVAL_COST = process.env.BACKGROUND_REMOVAL_COST;

export const calculateCredits = (credits: string) => {
  const faviconArchNumb =
    parseInt(credits) / parseInt(FAVICON_ARCHIVE_CREDITS_COST);
  const imageNumb = parseInt(credits) / parseInt(IMAGE_CREDITS_COST);
  const backgroundRemovalNumb =
    parseInt(credits) / parseInt(BACKGROUND_REMOVAL_COST);

  return {
    favicon: faviconArchNumb,
    images: imageNumb,
    backgroundRemoval: backgroundRemovalNumb,
  };
};
