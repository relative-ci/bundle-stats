import * as textSimilarity from 'text-similarity-node';

export interface BestMatch {
  target: string;
  rating: number;
}

export interface BestMatchResult {
  ratings: BestMatch[];
  bestMatch: BestMatch;
  bestMatchIndex: number;
}

/**
 * Compare two strings and return a similarity score between 0 and 1
 * Uses Jaro-Winkler algorithm which is optimized for short strings and proper names
 *
 * @param str1 - First string to compare
 * @param str2 - Second string to compare
 * @param caseSensitive - Whether comparison should be case-sensitive (default: false)
 * @returns Similarity score between 0 (completely different) and 1 (identical)
 */
export const compareTwoStrings = (str1: string, str2: string, caseSensitive = false): number => {
  if (!str1 || !str2) {
    return 0;
  }

  if (str1 === str2) {
    return 1;
  }

  // Use Jaro-Winkler algorithm for better performance with file paths and names
  return textSimilarity.similarity.jaroWinkler(str1, str2, caseSensitive);
};

/**
 * Find the best matching strings from a list of candidates
 *
 * @param mainString - The string to compare against
 * @param targetStrings - Array of candidate strings to compare
 * @param caseSensitive - Whether comparison should be case-sensitive (default: false)
 * @returns Object containing all ratings, best match, and best match index
 *
 * @example
 * ```typescript
 * const result = extractBestCandidates('hello', ['hallo', 'world', 'help']);
 * // result.bestMatch: { target: 'hallo', rating: 0.92 }
 * // result.bestMatchIndex: 0
 * // result.ratings: [
 * //   { target: 'hallo', rating: 0.92 },
 * //   { target: 'world', rating: 0.46 },
 * //   { target: 'help', rating: 0.85 }
 * // ]
 * ```
 */
export const extractBestCandidates = (
  mainString: string,
  targetStrings: string[],
  caseSensitive = false,
): BestMatchResult => {
  if (!mainString || !targetStrings || targetStrings.length === 0) {
    return {
      ratings: [],
      bestMatch: { target: '', rating: 0 },
      bestMatchIndex: -1,
    };
  }

  // Calculate similarity for all candidates
  const ratings: BestMatch[] = targetStrings.map((target) => ({
    target,
    rating: compareTwoStrings(mainString, target, caseSensitive),
  }));

  // Find the best match
  let bestMatchIndex = 0;
  let bestRating = ratings[0].rating;

  for (let i = 1; i < ratings.length; i += 1) {
    if (ratings[i].rating > bestRating) {
      bestRating = ratings[i].rating;
      bestMatchIndex = i;
    }
  }

  return {
    ratings,
    bestMatch: ratings[bestMatchIndex],
    bestMatchIndex,
  };
};

/**
 * Alternative comparison using Cosine similarity for longer strings
 * This is more suitable for comparing longer file paths or content
 *
 * @param str1 - First string to compare
 * @param str2 - Second string to compare
 * @param useWords - Whether to tokenize by words (true) or characters (false)
 * @param caseSensitive - Whether comparison should be case-sensitive
 * @returns Similarity score between 0 and 1
 */
export const compareWithCosine = (
  str1: string,
  str2: string,
  useWords = true,
  caseSensitive = false,
): number => {
  if (!str1 || !str2) {
    return 0;
  }

  if (str1 === str2) {
    return 1;
  }

  return textSimilarity.similarity.cosine(str1, str2, useWords, caseSensitive);
};
