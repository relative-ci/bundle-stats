/**
 * Extract (guess) filename from a hashed filename
 */
import { last } from 'lodash';

const FILENAME_HASH_PATTERN = /[.|-][a-f0-9]{5,32}$/;

export const getAssetName = (assetFilepath) => {
  const pathParts = assetFilepath.split('/');
  const dirname = pathParts.slice(0, -1).join('/');
  const filename = last(pathParts);

  const filenameParts = filename.split('.');

  const { basename, extension } = filenameParts.slice(-2, -1).join('') === 'min'
    ? {
      basename: filenameParts.slice(0, -2).join('.'),
      extension: filenameParts.slice(-2).join('.'),
    } : {
      basename: filenameParts.slice(0, -1).join('.'),
      extension: filenameParts.slice(-1).join('.'),
    };

  return `${dirname ? `${dirname}/` : ''}${basename.replace(FILENAME_HASH_PATTERN, '')}.${extension}`;
};
