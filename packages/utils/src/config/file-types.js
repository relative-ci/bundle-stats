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
  [FILE_TYPE_JS]: /\.js$/,
  [FILE_TYPE_IMG]: /\.(png|jpe?g|webp|gif|svg|ico)$/,
  [FILE_TYPE_MEDIA]: /\.(mp4|mp3|mov)$/,
  [FILE_TYPE_FONT]: /\.(woff|woff2|ttf|otf)$/,
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

export const FILE_TYPES = [
  ...Object.keys(FILE_TYPE_PATTERNS),
  FILE_TYPE_OTHER,
];
