import {
  FILE_TYPE_OTHER,
  FILE_TYPE_PATTERNS,
  MODULE_DESTINATION_PATTERNS,
  MODULE_SOURCE_PATTERNS,
} from '../config/file-types';

/**
 * Get file type using an array of patterns
 *
 * @param {string} filename
 * @param {Object} patterns
 *
 * @return {string} file type
 */
export const getFilenameFileType = (filename, patterns) => {
  const fileType = Object.entries(patterns).find(([, pattern]) => pattern.test(filename));
  return fileType ? fileType[0] : FILE_TYPE_OTHER;
};

export const getFileType = (filename) => {
  const fileType = Object.entries(FILE_TYPE_PATTERNS).find(([, pattern]) => pattern.test(filename));
  return fileType ? fileType[0] : FILE_TYPE_OTHER;
};

/**
 * Get module source file type
 *
 * @param {string} moduleSourceFilename
 * @return {string} file type
 */
export const getModuleSourceFileType = (moduleSourceFilename) =>
  getFilenameFileType(moduleSourceFilename, MODULE_SOURCE_PATTERNS);

/**
 * Get module file type
 *
 * @param {string} moduleFilename
 * @return {string} file type
 */
export const getModuleFileType = (moduleFilename) =>
  getFilenameFileType(moduleFilename, MODULE_DESTINATION_PATTERNS);
