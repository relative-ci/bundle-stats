/**
 * Extract (guess) filename from a hashed filename
 */

export const extractFilename = (name) => name.replace(/\.[a-f0-9]{5,32}\./, '.');
