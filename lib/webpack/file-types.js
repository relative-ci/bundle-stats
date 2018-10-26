// Content types a la Chrome Dev Toolbar
export const FILE_TYPE_CSS = 'CSS';
export const FILE_TYPE_JS = 'JS';
export const FILE_TYPE_IMG = 'IMG';
export const FILE_TYPE_MEDIA = 'MEDIA';
export const FILE_TYPE_FONT = 'FONT';
export const FILE_TYPE_HTML = 'HTML';
export const FILE_TYPE_OTHER = 'OTHER';

export const FILE_TYPES = {
  [FILE_TYPE_CSS]: /\.css$/,
  [FILE_TYPE_JS]: /\.js$/,
  [FILE_TYPE_IMG]: /\.(png|jpe?g|webp|gif|svg|ico)$/,
  [FILE_TYPE_MEDIA]: /\.(mp4|mp3|mov)$/,
  [FILE_TYPE_FONT]: /\.(woff|woff2|ttf|otf)$/,
  [FILE_TYPE_HTML]: /\.(html?)$/,
  [FILE_TYPE_OTHER]: /^.*$/,
};

export const getFileType = filename => {
  const foundFileType = Object.entries(FILE_TYPES).find(([, typePattern]) => typePattern.test(filename));

  return foundFileType && foundFileType[0];
}
