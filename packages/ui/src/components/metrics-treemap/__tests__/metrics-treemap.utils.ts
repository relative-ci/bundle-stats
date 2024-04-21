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
      id: 'root',
      name: 'root',
      value: 0,
      children: [
        {
          id: 'src',
          value: 0,
          children: [
            {
              id: 'app.jsx',
              value: 100,
              item: {
                key: './src/app.jsx',
                label: 'app.jsx',
                runs: [{ value: 100 }],
              },
            },
            {
              id: 'components',
              value: 0,
              children: [
                {
                  id: 'header.jsx',
                  value: 100,
                  item: {
                    key: './src/components/header.jsx',
                    label: 'header.jsx',
                    runs: [{ value: 100 }],
                  },
                },
                {
                  id: 'footer.jsx',
                  value: 100,
                  item: {
                    key: './src/components/footer.jsx',
                    label: 'footer.jsx',
                    runs: [{ value: 100 }],
                  },
                },
              ],
            },
            {
              id: 'ui',
              value: 0,
              children: [
                {
                  id: 'button.jsx',
                  value: 100,
                  item: {
                    key: './src/ui/button.jsx',
                    label: 'button.jsx',
                    runs: [{ value: 100 }],
                  },
                },
              ],
            },
          ],
        },
        {
          id: 'node_modules',
          value: 0,
          children: [
            {
              id: 'react',
              value: 0,
              children: [
                {
                  id: 'dist',
                  value: 0,
                  children: [
                    {
                      id: 'react.production.js',
                      value: 100,
                      item: {
                        key: './node_modules/react/dist/react.production.js',
                        label: 'react.production.js',
                        runs: [{ value: 100 }],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'favicon.ico',
          value: 10,
          item: {
            key: 'favicon.ico',
            label: 'favicon.ico',
            runs: [{ value: 10 }],
          },
        },
      ],
    });
  });
});
