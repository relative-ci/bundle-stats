/**
 * Extract (guess) filename from a hashed filename
 */

const extractFilename = (name) => {
  return name.replace(/\.[a-f0-9]{5,32}\./, '.');
};

export default extractFilename;
