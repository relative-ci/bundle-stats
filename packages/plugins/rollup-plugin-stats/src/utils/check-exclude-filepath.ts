type ExcludeFilepathParam = string | RegExp | ((filepath: string) => boolean);

export type ExcludeFilepathPatterns =
  | ExcludeFilepathParam
  | Array<ExcludeFilepathParam>;

/**
 * Check if filepath should be excluded based on patterns
 */
export function checkExcludeFilepath(
  filepath: string,
  patterns?: ExcludeFilepathPatterns
): boolean {
  if (!patterns) {
    return false;
  }

  if (Array.isArray(patterns)) {
    let res = false;

    for (let i = 0; i <= patterns.length - 1 && res === false; i++) {
      res = checkExcludeFilepath(filepath, patterns[i]);
    }

    return res;
  }

  if (typeof patterns === 'function') {
    return patterns(filepath);
  }

  if (typeof patterns === 'string') {
    return Boolean(filepath.match(patterns));
  }

  if ('test' in patterns) {
    return patterns.test(filepath);
  }

  return false;
}
