import { getTreemapNodesGroupedByPath } from '../metrics-treemap.utils';

describe('MetricsTreemap / getTreeNodesGroupedByPath', () => {
  test('should group tree ndoes by path', () => {
    const actual = getTreemapNodesGroupedByPath([
      {
        key: './src/app.jsx',
        runs: [{ value: 100 }],
      },
      {
        key: './src/components/header.jsx',
        runs: [{ value: 100 }],
      },
      {
        key: './src/components/footer.jsx',
        runs: [{ value: 100 }],
      },
      {
        key: './src/ui/button.jsx',
        runs: [{ value: 100 }],
      },
      {
        key: './node_modules/react/dist/react.production.js',
        runs: [{ value: 100 }],
      },
      {
        key: 'favicon.ico',
        runs: [{ value: 10 }],
      },
    ] as any);

    expect(actual).toStrictEqual({
      id: '',
      label: '(root)',
      value: 0,
      children: [
        {
          id: '.',
          label: '.',
          value: 0,
          children: [
            {
              id: './src',
              label: 'src',
              value: 0,
              children: [
                {
                  id: './src/app.jsx',
                  label: 'app.jsx',
                  value: 100,
                  item: {
                    key: './src/app.jsx',
                    runs: [{ value: 100 }],
                  },
                },
                {
                  id: './src/components',
                  label: 'components',
                  value: 0,
                  children: [
                    {
                      id: './src/components/header.jsx',
                      label: 'header.jsx',
                      value: 100,
                      item: {
                        key: './src/components/header.jsx',
                        runs: [{ value: 100 }],
                      },
                    },
                    {
                      id: './src/components/footer.jsx',
                      label: 'footer.jsx',
                      value: 100,
                      item: {
                        key: './src/components/footer.jsx',
                        runs: [{ value: 100 }],
                      },
                    },
                  ],
                },
                {
                  id: './src/ui',
                  label: 'ui',
                  value: 0,
                  children: [
                    {
                      id: './src/ui/button.jsx',
                      label: 'button.jsx',
                      value: 100,
                      item: {
                        key: './src/ui/button.jsx',
                        runs: [{ value: 100 }],
                      },
                    },
                  ],
                },
              ],
            },
            {
              id: './node_modules',
              label: 'node_modules',
              value: 0,
              children: [
                {
                  id: './node_modules/react',
                  label: 'react',
                  value: 0,
                  children: [
                    {
                      id: './node_modules/react/dist',
                      label: 'dist',
                      value: 0,
                      children: [
                        {
                          id: './node_modules/react/dist/react.production.js',
                          label: 'react.production.js',
                          value: 100,
                          item: {
                            key: './node_modules/react/dist/react.production.js',
                            runs: [{ value: 100 }],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'favicon.ico',
          label: 'favicon.ico',
          value: 10,
          item: {
            key: 'favicon.ico',
            runs: [{ value: 10 }],
          },
        },
      ],
    });
  });
});
