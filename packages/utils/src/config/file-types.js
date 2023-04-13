// Content types a la Chrome Dev Toolbar
export const FILE_TYPE_CSS = 'CSS';
export const FILE_TYPE_JS = 'JS';
export const FILE_TYPE_IMG = 'IMG';
export const FILE_TYPE_MEDIA = 'MEDIA';
export const FILE_TYPE_FONT = 'FONT';
export const FILE_TYPE_HTML = 'HTML';
export const FILE_TYPE_OTHER = 'OTHER';

export const FILE_TYPE_PATTERNS = {
  [FILE_TYPE_CSS]: /\.css$/,
  [FILE_TYPE_JS]: /\.(js|cjs|mjs)$/,
  [FILE_TYPE_IMG]: /\.(a?png|jpe?g|webp|gif|svg|ico|avif)$/,
  [FILE_TYPE_MEDIA]: /\.(mp4|mp3|m4a|aac|mov|webm|wav|ogg)$/,
  [FILE_TYPE_FONT]: /\.(woff|woff2|ttf|otf|eot)$/,
  [FILE_TYPE_HTML]: /\.(html?)$/,
};

export const FILE_TYPE_LABELS = {
  [FILE_TYPE_CSS]: 'CSS',
  [FILE_TYPE_JS]: 'JS',
  [FILE_TYPE_IMG]: 'IMG',
  [FILE_TYPE_MEDIA]: 'Media',
  [FILE_TYPE_FONT]: 'Fonts',
  [FILE_TYPE_HTML]: 'HTML',
  [FILE_TYPE_OTHER]: 'Other',
};

export const FILE_TYPES = [...Object.keys(FILE_TYPE_PATTERNS), FILE_TYPE_OTHER];

/**
 * Module source -> destination type matching
 * Separate css/js files to be able to go from a specific asset to the corresponding modules
 */
export const MODULE_SOURCE_PATTERNS = {
  [FILE_TYPE_CSS]: /\.(css|styl|sass|scss|less)$/,
  [FILE_TYPE_JS]: /\.(jsx?|tsx?|cjs|mjs)$/,
};

export const MODULE_SOURCE_FILE_TYPES = [...Object.keys(MODULE_SOURCE_PATTERNS), FILE_TYPE_OTHER];

export const MODULE_DESTINATION_PATTERNS = {
  [FILE_TYPE_CSS]: /\.css$/,
  [FILE_TYPE_JS]: /\.(js|cjs|mjs)$/,
};

export const MODULE_DESTINATION_FILE_TYPES = Object.keys(MODULE_DESTINATION_PATTERNS);
