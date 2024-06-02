export const DEFAULT_OPTIMIZATION_PERCENTAGE = 100;

export const ARCHIVE_NAME = 'imgazilla-favicon';
export const ARCHIVE_NAME_OPTIMIZATION = 'imgazilla-optimization';

export const TITLE_TO_QUALITY_PERCENTAGE = {
  100: "Highest Quality",
  75: "High Quality",
  50: "Medium Quality",
  25: "Basic Quality",
  0: "Low Quality",
};

//TODO: Return this options from the config API
export const ANDROID_ICONS_SIZES = ['36x36', '48x48', '72x72', '96x96', '144x144', '192x192']

export const MIME_TYPE_PNG = 'image/png';
export const MIME_TYPE_SVG = 'image/svg+xml';

export const FORMAT_TO_MIME_TYPE = {
  'PNG': MIME_TYPE_PNG,
  'SVG': MIME_TYPE_SVG,
}