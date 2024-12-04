export const DEFAULT_OPTIMIZATION_PERCENTAGE = 100;

export const ARCHIVE_NAME = 'imgazilla-favicon';
export const ARCHIVE_NAME_OPTIMIZATION = 'imgazilla-optimization';

export const QUALITY_PERCENTAGE_STEP = 25;

export const TITLE_TO_QUALITY_PERCENTAGE = {
  100: 'High Quality',
  50: 'Medium Quality',
  25: 'Basic Quality',
  1: 'Low Quality',
};

//TODO: Return this options from the config API
export const ANDROID_ICONS_SIZES = [
  '36x36',
  '48x48',
  '72x72',
  '96x96',
  '144x144',
  '192x192',
];

export const PDF_FORMAT = 'PDF';
export const SVG_FORMAT = 'SVG';
export const PNG_FORMAT = 'PNG';
export const JPG_FORMAT = 'JPG';
export const WEB_P_FORMAT = 'WebP';
export const AVIF_FORMAT = 'AVIF';

export const MIME_TYPE_PNG = 'image/png';
export const MIME_TYPE_SVG = 'image/svg+xml';
export const MIME_TYPE_PDF = 'application/pdf';

export const FORMAT_TO_MIME_TYPE = {
  [PNG_FORMAT]: MIME_TYPE_PNG,
  [SVG_FORMAT]: MIME_TYPE_SVG,
  [PDF_FORMAT]: MIME_TYPE_PDF,
};

export const SUPPORTED_IMAGE_FORMATS = ['png', 'jpg', 'svg'];
export const SUPPORTED_FILE_FORMATS = ['pdf'];

export const MAX_COLOR_HISTORY_LENGTH = 10;

export const HOME = 'HOME';
export const FAVICON_EXPORT = 'FAVICON_EXPORT';
export const IMAGE_OPTIMIZATION = 'IMAGE_OPTIMIZATION';
export const PAGE_IMAGES_OPTIMIZATION = 'PAGE_IMAGES_OPTIMIZATION';
export const SELECT_IMAGES_OPTIMIZATION = 'SELECT_IMAGES_OPTIMIZATION';
export const BACKGROUND_REMOVAL = 'BACKGROUND_REMOVAL';
export const GIF_ANIMATION = 'GIF_ANIMATION';
export const PDF_CREATION = 'PDF_CREATION';

export const APP_ROUTES_PATHS = {
  [HOME]: '/',
  [FAVICON_EXPORT]: 'favicon-exporter',
  [IMAGE_OPTIMIZATION]: 'image-optimization',
  [PAGE_IMAGES_OPTIMIZATION]: 'page-images-optimization',
  [SELECT_IMAGES_OPTIMIZATION]: 'select-images-optimization',
  [BACKGROUND_REMOVAL]: 'background-removal',
};

export const TAB_ROUTES = {
  [FAVICON_EXPORT]: {
    name: 'Favicon exporter',
    path: `/${APP_ROUTES_PATHS[FAVICON_EXPORT]}`,
  },
  [IMAGE_OPTIMIZATION]: {
    name: 'Image optimization',
    path: `/${APP_ROUTES_PATHS[IMAGE_OPTIMIZATION]}`,
  },
  [BACKGROUND_REMOVAL]: {
    name: 'Background removal',
    path: `/${APP_ROUTES_PATHS[BACKGROUND_REMOVAL]}`,
  },
};

export const ANALYTIC_EVENTS = {
  OPEN_FAVICON_PREVIEW: 'open-favicon-preview',
  OPEN_INSTRUCTION: 'open-instructions',
  OPEN_EARN_CREDITS: 'open-earn-credits',
  OPEN_BACKGROUND_REMOVAL_PAGE: 'open-background-removal_page',
  DOWNLOAD_FAVICON_ARCHIVE: 'download-favicon-archive',
  DOWNLOAD_IMAGES_ARCHIVE: 'download-images-archive',
  UPDATE_IMAGE_FORMAT: 'update-image-format',
  BACKGROUND_REMOVAL_PAGE: 'background-removal-page',
  BACKGROUND_REMOVAL_CLICK: 'background-removal-click',
  BACKGROUND_REMOVAL_CLICK_ON_DOWNLOAD: 'background-removal-click-on-download',
  BACKGROUND_REMOVAL_CLICK_ON_ADD_TO_PAGE:
    'background-removal-click-on-add-to-page',
};

export const ACCOUNT_STORAGE_KEY = 'showAccountConfetti';
export const BONUS_MODAL_STORAGE_KEY = 'showBonusModal';
