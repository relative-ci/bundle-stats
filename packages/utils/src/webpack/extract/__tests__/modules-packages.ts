import { extractModulesPackages, getPackageMetaFromModulePath } from '../modules-packages';

describe('Webpack/extract', () => {
  describe('getPackageMetaFromModulePath', () => {
    test('should skip modules outside of node_modules paths', () => {
      expect(getPackageMetaFromModulePath('./components/home.jsx')).toEqual(null);
    });

    describe('npm', () => {
      test('should extract from 1st level dependenct module paths', () => {
        expect(getPackageMetaFromModulePath('./node_modules/package-a/lib/index.js')).toEqual({
          id: 'package-a',
          name: 'package-a',
          path: './node_modules/package-a',
        });
        expect(getPackageMetaFromModulePath('../node_modules/package-a/lib/index.js')).toEqual({
          id: 'package-a',
          name: 'package-a',
          path: '../node_modules/package-a',
        });
        expect(getPackageMetaFromModulePath('./node_modules/@org/package-a/lib/index.js')).toEqual({
          id: '@org/package-a',
          name: '@org/package-a',
          path: './node_modules/@org/package-a',
        });
      });

      test('should extract from 2nd level dependency module paths', () => {
        expect(
          getPackageMetaFromModulePath(
            './node_modules/package-a/node_modules/package-b/lib/index.js',
          ),
        ).toEqual({
          id: 'package-a:package-b',
          name: 'package-b',
          path: './node_modules/package-a/node_modules/package-b',
        });
        expect(
          getPackageMetaFromModulePath(
            './node_modules/@org/package-a/node_modules/package-b/lib/index.js',
          ),
        ).toEqual({
          id: '@org/package-a:package-b',
          name: 'package-b',
          path: './node_modules/@org/package-a/node_modules/package-b',
        });
        expect(
          getPackageMetaFromModulePath(
            './node_modules/@org/package-a/node_modules/@org/package-b/lib/index.js',
          ),
        ).toEqual({
          id: '@org/package-a:@org/package-b',
          name: '@org/package-b',
          path: './node_modules/@org/package-a/node_modules/@org/package-b',
        });
      });
    });

    describe('pnpm', () => {
      test('should extract from 1st level dependency module path', () => {
        expect(
          getPackageMetaFromModulePath(
            './node_modules/.pnpm/package-a@1.0.0/node_modules/package-a/index.js',
          ),
        ).toEqual({
          id: 'package-a',
          name: 'package-a',
          path: './node_modules/.pnpm/package-a@1.0.0/node_modules/package-a',
        });

        expect(
          getPackageMetaFromModulePath(
            './node_modules/.pnpm/@org+package-a@1.0.0/node_modules/@org/package-a/index.js',
          ),
        ).toEqual({
          id: '@org/package-a',
          name: '@org/package-a',
          path: './node_modules/.pnpm/@org+package-a@1.0.0/node_modules/@org/package-a',
        });
      });

      test('should extract from nested dependency module path', () => {
        expect(
          getPackageMetaFromModulePath(
            './node_modules/.pnpm/package-a@1.0.0/node_modules/package-b/index.js',
          ),
        ).toEqual({
          id: 'package-a:package-b',
          name: 'package-b',
          path: './node_modules/.pnpm/package-a@1.0.0/node_modules/package-b',
        });

        expect(
          getPackageMetaFromModulePath(
            './node_modules/.pnpm/@org+package-a@1.0.0/node_modules/package-b/lib/index.js',
          ),
        ).toEqual({
          id: '@org/package-a:package-b',
          name: 'package-b',
          path: './node_modules/.pnpm/@org+package-a@1.0.0/node_modules/package-b',
        });

        expect(
          getPackageMetaFromModulePath(
            './node_modules/.pnpm/@org+package-a@1.0.0/node_modules/@org/package-b/lib/index.js',
          ),
        ).toEqual({
          id: '@org/package-a:@org/package-b',
          name: '@org/package-b',
          path: './node_modules/.pnpm/@org+package-a@1.0.0/node_modules/@org/package-b',
        });
      });

      test('should extract from peer dependency module paths', () => {
        expect(
          getPackageMetaFromModulePath(
            './node_modules/.pnpm/package-a@1.0.0_package-b@1.0.0/node_modules/package-a/lib/index.js',
          ),
        ).toEqual({
          id: 'package-b:package-a',
          name: 'package-a',
          path: './node_modules/.pnpm/package-a@1.0.0_package-b@1.0.0/node_modules/package-a',
        });

        expect(
          getPackageMetaFromModulePath(
            './node_modules/.pnpm/package-a@1.0.0_package-b@1.0.0/node_modules/package-c/lib/index.js',
          ),
        ).toEqual({
          id: 'package-a:package-b:package-c',
          name: 'package-c',
          path: './node_modules/.pnpm/package-a@1.0.0_package-b@1.0.0/node_modules/package-c',
        });

        expect(
          getPackageMetaFromModulePath(
            './node_modules/.pnpm/@org+package-a@1.0.0_package-b@1.0.0/node_modules/package-c/lib/index.js',
          ),
        ).toEqual({
          id: '@org/package-a:package-b:package-c',
          name: 'package-c',
          path: './node_modules/.pnpm/@org+package-a@1.0.0_package-b@1.0.0/node_modules/package-c',
        });

        expect(
          getPackageMetaFromModulePath(
            './node_modules/.pnpm/@org+package-a@1.0.0_@org+package-b@1.0.0/node_modules/package-c/lib/index.js',
          ),
        ).toEqual({
          id: '@org/package-a:@org/package-b:package-c',
          name: 'package-c',
          path: './node_modules/.pnpm/@org+package-a@1.0.0_@org+package-b@1.0.0/node_modules/package-c',
        });
      });

      test('should extract from git dependency module paths', () => {
        expect(
          getPackageMetaFromModulePath(
            './node_modules/.pnpm/github.com+org-a+repo-a@abcd1234/node_modules/repo-a/src/index.js',
          ),
        ).toEqual({
          id: 'github.com/org-a/repo-a:repo-a',
          name: 'repo-a',
          path: './node_modules/.pnpm/github.com+org-a+repo-a@abcd1234/node_modules/repo-a',
        });
      });
    });
  });

  describe('extractModulesPackages', () => {
    test('should return empty', () => {
      const actual = extractModulesPackages();
      expect(actual).toEqual({ metrics: { packages: {} } });
    });

    test('should return packages metrics', () => {
      const actual = extractModulesPackages(null, {
        metrics: {
          modules: {
            'pages/page-a.js': {
              name: 'pages/page-a.js',
              value: 100,
              chunkIds: ['0'],
            },
            './node_modules/package-a/index.js': {
              name: './node_modules/package-a/index.js',
              value: 20,
              chunkIds: ['1'],
            },
            './~/package-c/index.js': {
              name: './~/package-c/index.js',
              value: 10,
              chunkIds: ['1'],
            },
            './node_modules/package-a/dist/module-a.js': {
              name: './node_modules/package-a/dist/module-a.js',
              value: 30,
              chunkIds: ['1'],
            },
            './node_modules/package-b/index.js': {
              name: './node_modules/package-b/index.js',
              value: 10,
              chunkIds: ['1'],
            },
            './node_modules/package-a/node_modules/package-b/index.js': {
              name: './node_modules/package-a/node_modules/package-b/index.js',
              value: 20,
              chunkIds: ['1'],
            },
            './node_modules/@org/package-a/index.js': {
              name: './node_modules/@org/package-a/index.js',
              value: 20,
              chunkIds: ['1'],
            },
            './node_modules/@org/package-a/node_modules/@org/package-b/index.js': {
              name: './node_modules/@org/package-a/node_modules/@org/package-b/index.js',
              value: 20,
              chunkIds: ['1'],
            },
            '../lib/node_modules/@org/package-a/node_modules/@org/package-b/index.js': {
              name: '../lib/node_modules/@org/package-a/node_modules/@org/package-b/index.js',
              value: 25,
              chunkIds: ['1'],
            },
            '../lib/node_modules/@org/package-a/node_modules/@org/package-b/module-a.js': {
              name: '../lib/node_modules/@org/package-a/node_modules/@org/package-b/module-a.js',
              value: 10,
              chunkIds: ['1'],
            },
          },
        },
      });

      expect(actual).toEqual({
        metrics: {
          packages: {
            'package-a': {
              name: 'package-a',
              path: './node_modules/package-a',
              value: 50,
            },
            'package-b': {
              name: 'package-b',
              path: './node_modules/package-b',
              value: 10,
            },
            'package-c': {
              name: 'package-c',
              path: './~/package-c',
              value: 10,
            },
            'package-a:package-b': {
              name: 'package-b',
              path: './node_modules/package-a/node_modules/package-b',
              value: 20,
            },
            '@org/package-a': {
              name: '@org/package-a',
              path: './node_modules/@org/package-a',
              value: 20,
            },
            '@org/package-a:@org/package-b': {
              name: '@org/package-b',
              path: './node_modules/@org/package-a/node_modules/@org/package-b',
              value: 20,
            },
            '@org/package-a:@org/package-b~1': {
              name: '@org/package-b',
              path: '../lib/node_modules/@org/package-a/node_modules/@org/package-b',
              value: 35,
            },
          },
        },
      });
    });
  });
});
