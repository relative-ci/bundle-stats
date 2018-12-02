/**
 * Extract (guess) filename from a hashed filename
 */

export const getAssetName = assetFilename => assetFilename.replace(/\.[a-f0-9]{5,32}\./, '.');
