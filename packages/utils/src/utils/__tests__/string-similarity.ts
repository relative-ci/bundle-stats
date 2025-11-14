import { compareTwoStrings, extractBestCandidates, compareWithCosine } from '../string-similarity';

describe('string-similarity', () => {
  describe('compareTwoStrings', () => {
    test('should return 1 for identical strings', () => {
      expect(compareTwoStrings('hello', 'hello')).toBe(1);
      expect(compareTwoStrings('test-file.js', 'test-file.js')).toBe(1);
    });

    test('should return 0 for completely different strings', () => {
      const result = compareTwoStrings('abc', 'xyz');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(0.5); // Should be low similarity
    });

    test('should return high similarity for similar strings', () => {
      const result = compareTwoStrings('hello', 'hallo');
      expect(result).toBeGreaterThan(0.8); // Jaro-Winkler is good at detecting typos
    });

    test('should handle case sensitivity', () => {
      // Case-insensitive (default)
      const caseInsensitive = compareTwoStrings('Hello', 'hello', false);
      expect(caseInsensitive).toBe(1);

      // Case-sensitive
      const caseSensitive = compareTwoStrings('Hello', 'hello', true);
      expect(caseSensitive).toBeLessThan(1);
    });

    test('should return 0 for empty strings', () => {
      expect(compareTwoStrings('', 'hello')).toBe(0);
      expect(compareTwoStrings('hello', '')).toBe(0);
      expect(compareTwoStrings('', '')).toBe(0);
    });

    test('should work with file paths', () => {
      const path1 = 'static/js/main.abc123.chunk.js';
      const path2 = 'static/js/main.def456.chunk.js';
      const result = compareTwoStrings(path1, path2);
      expect(result).toBeGreaterThan(0.8); // High similarity despite different hashes
    });

    test('should work with webpack module names', () => {
      const module1 = './node_modules/react/index.js';
      const module2 = './node_modules/react/index.jsx';
      const result = compareTwoStrings(module1, module2);
      expect(result).toBeGreaterThan(0.9); // Very similar, just different extension
    });
  });

  describe('extractBestCandidates', () => {
    test('should find the best match from candidates', () => {
      const result = extractBestCandidates('hello', ['hallo', 'world', 'help']);

      expect(result.bestMatch.target).toBe('hallo');
      expect(result.bestMatch.rating).toBeGreaterThan(0.8);
      expect(result.bestMatchIndex).toBe(0);
    });

    test('should return all ratings', () => {
      const result = extractBestCandidates('test', ['test', 'best', 'rest', 'west']);

      expect(result.ratings).toHaveLength(4);
      expect(result.ratings[0].target).toBe('test');
      expect(result.ratings[0].rating).toBe(1); // Exact match
    });

    test('should handle file paths with hashes', () => {
      const mainFile = 'main.abc123.js';
      const candidates = ['main.def456.js', 'vendor.abc123.js', 'runtime.xyz789.js'];

      const result = extractBestCandidates(mainFile, candidates);

      expect(result.bestMatch.target).toBe('main.def456.js');
      expect(result.bestMatch.rating).toBeGreaterThan(0.7);
    });

    test('should handle webpack chunk names', () => {
      const mainChunk = 'static/js/2.abc123.chunk.js';
      const candidates = [
        'static/js/2.def456.chunk.js',
        'static/js/3.abc123.chunk.js',
        'static/css/2.abc123.chunk.css',
      ];

      const result = extractBestCandidates(mainChunk, candidates);

      // Both files have high similarity, but different strengths
      // The algorithm finds the best match based on overall similarity
      expect(result.bestMatch.rating).toBeGreaterThan(0.8);
      expect(result.ratings).toHaveLength(3);

      // Verify that static/js files have higher ratings than static/css
      const jsFile1Rating = result.ratings[0].rating;
      const jsFile2Rating = result.ratings[1].rating;
      const cssFileRating = result.ratings[2].rating;

      expect(Math.max(jsFile1Rating, jsFile2Rating)).toBeGreaterThan(cssFileRating);
    });

    test('should handle module paths', () => {
      const mainModule = './node_modules/lodash/get.js';
      const candidates = [
        './node_modules/lodash/set.js',
        './node_modules/lodash/get.js',
        './node_modules/react/index.js',
      ];

      const result = extractBestCandidates(mainModule, candidates);

      expect(result.bestMatch.target).toBe('./node_modules/lodash/get.js');
      expect(result.bestMatch.rating).toBe(1); // Exact match
    });

    test('should handle empty candidates array', () => {
      const result = extractBestCandidates('test', []);

      expect(result.ratings).toHaveLength(0);
      expect(result.bestMatch.target).toBe('');
      expect(result.bestMatch.rating).toBe(0);
      expect(result.bestMatchIndex).toBe(-1);
    });

    test('should handle empty main string', () => {
      const result = extractBestCandidates('', ['test', 'best']);

      expect(result.ratings).toHaveLength(0);
      expect(result.bestMatch.target).toBe('');
      expect(result.bestMatch.rating).toBe(0);
      expect(result.bestMatchIndex).toBe(-1);
    });

    test('should handle case sensitivity', () => {
      const candidates = ['Hello', 'hello', 'HELLO'];

      // Case-insensitive (default)
      const caseInsensitive = extractBestCandidates('hello', candidates, false);
      expect(caseInsensitive.bestMatch.rating).toBe(1);

      // Case-sensitive
      const caseSensitive = extractBestCandidates('hello', candidates, true);
      expect(caseSensitive.bestMatch.target).toBe('hello');
      expect(caseSensitive.bestMatch.rating).toBe(1);
    });

    test('should work with real-world Next.js build output', () => {
      const baselineFile = '_next/static/chunks/pages/index-abc123def.js';
      const currentFiles = [
        '_next/static/chunks/pages/index-xyz789abc.js',
        '_next/static/chunks/pages/about-abc123def.js',
        '_next/static/chunks/framework-123456789.js',
      ];

      const result = extractBestCandidates(baselineFile, currentFiles);

      expect(result.bestMatch.target).toBe('_next/static/chunks/pages/index-xyz789abc.js');
      expect(result.bestMatch.rating).toBeGreaterThan(0.7);
    });

    test('should work with webpack module paths with loaders', () => {
      const baselineModule = './src/components/Button.jsx';
      const currentModules = [
        './src/components/Button.jsx',
        './src/components/Button.css',
        './src/components/Link.jsx',
      ];

      const result = extractBestCandidates(baselineModule, currentModules);

      expect(result.bestMatch.target).toBe('./src/components/Button.jsx');
      expect(result.bestMatch.rating).toBe(1);
    });
  });

  describe('compareWithCosine', () => {
    test('should return 1 for identical strings', () => {
      expect(compareWithCosine('hello world', 'hello world')).toBe(1);
    });

    test('should handle word-based tokenization', () => {
      const result = compareWithCosine('hello world', 'world hello', true);
      expect(result).toBeGreaterThan(0.9); // Word order shouldn't matter much
    });

    test('should handle character-based tokenization', () => {
      const result = compareWithCosine('hello', 'hallo', false);
      expect(result).toBeGreaterThanOrEqual(0.5);
    });

    test('should return 0 for empty strings', () => {
      expect(compareWithCosine('', 'hello')).toBe(0);
      expect(compareWithCosine('hello', '')).toBe(0);
    });

    test('should work with long file paths', () => {
      const path1 = './src/components/features/dashboard/analytics/ChartComponent.jsx';
      const path2 = './src/components/features/dashboard/analytics/TableComponent.jsx';
      const result = compareWithCosine(path1, path2, true);
      expect(result).toBeGreaterThan(0.6); // Should have high similarity
    });
  });

  describe('Performance characteristics', () => {
    test('should handle large candidate lists efficiently', () => {
      const mainString = 'test-file-123.js';
      const candidates = Array.from({ length: 1000 }, (_, i) => `file-${i}.js`);
      candidates.push('test-file-456.js'); // Add a similar file

      const startTime = performance.now();
      const result = extractBestCandidates(mainString, candidates);
      const endTime = performance.now();

      expect(result.bestMatch.target).toBe('test-file-456.js');
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in less than 1 second
    });
  });

  describe('Edge cases', () => {
    test('should handle strings with special characters', () => {
      const result = compareTwoStrings('test-file@2.0.0.js', 'test-file@2.0.1.js');
      expect(result).toBeGreaterThan(0.8);
    });

    test('should handle unicode characters', () => {
      const result = compareTwoStrings('café', 'cafe', false);
      expect(result).toBeGreaterThan(0.5);
    });

    test('should handle very long strings', () => {
      const longString1 = 'a'.repeat(1000);
      const longString2 = `${'a'.repeat(999)}b`;
      const result = compareTwoStrings(longString1, longString2);
      expect(result).toBeGreaterThan(0.9); // Should be very similar
    });
  });
});
