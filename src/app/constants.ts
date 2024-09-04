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

export const MIME_TYPE_PNG = 'image/png';
export const MIME_TYPE_SVG = 'image/svg+xml';
export const MIME_TYPE_PDF = 'application/pdf';

export const FORMAT_TO_MIME_TYPE = {
  PNG: MIME_TYPE_PNG,
  SVG: MIME_TYPE_SVG,
  PDF: MIME_TYPE_PDF,
};

export const PDF_FORMAT = 'PDF';
export const SVG_FORMAT = 'SVG';
export const PNG_FORMAT = 'PNG';
export const JPG_FORMAT = 'JPG';

export const SUPPORTED_IMAGE_FORMATS = ['png', 'jpg', 'svg'];
export const SUPPORTED_FILE_FORMATS = ['pdf'];

export const MAX_COLOR_HISTORY_LENGTH = 10;
