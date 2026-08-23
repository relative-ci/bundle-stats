export const stats = {
  'assets/logo.abcd1234.svg': {
    fileName: 'assets/logo.abcd1234.svg',
    type: 'asset',
    source: '<svg></svg>',
  },
  'assets/main.abcd1234.js': {
    fileName: 'assets/main.abcd1234.js',
    type: 'chunk',
    code: 'export default function () {}',
    modules: {
      '/home/user/project/src/main.js': {
        code: 'export default function () {}',
      },
      '/home/user/project/src/utils.js': {
        code: 'export default function () {}',
      },
    },
    map: { version: '3' },
  },
  'assets/vendors.abcd1234.js': {
    fileName: 'assets/vendors.abcd1234.js',
    type: 'chunk',
    code: 'export default function () {}',
    modules: {
      '/home/user/project/node_modules/package-a/index.js': {
        code: 'export default function () {}',
      },
      '/home/user/project/node_modules/package-b/index.js': {
        code: 'export default function () {}',
      },
    },
    map: { version: '3' },
  },
};
