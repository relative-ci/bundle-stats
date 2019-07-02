export default {
  runs: [
    {
      internalBuildNumber: 1,
    },
    {
      internalBuildNumber: 2,
    },
  ],
  sizes: [
    {
      key: 'webpack.assets.totalSizeByTypeJS',
      label: 'JS',
      changed: true,
      biggerIsBetter: false,
      runs: [
        {
          value: 50000,
          displayValue: '48.83KB',
          delta: 2.04081633,
          displayDelta: '+2.04%',
        },
        {
          value: 49000,
          displayValue: '47.85KB',
        },
      ],
    },
    {
      key: 'webpack.assets.totalSizeByTypeCSS',
      label: 'CSS',
      changed: true,
      biggerIsBetter: false,
      runs: [
        {
          value: 10000,
          displayValue: '9.77KB',
          delta: -9.09090909,
          displayDelta: '-9.09%',
        },
        {
          value: 11000,
          displayValue: '10.74KB',
        },
      ],
    },
    {
      key: 'webpack.assets.totalSizeByTypeIMG',
      label: 'IMG',
      changed: false,
      biggerIsBetter: false,
      runs: [
        {
          value: 1000,
          displayValue: '1000B',
          delta: 0,
          displayDelta: '0%',
        },
        {
          value: 1000,
          displayValue: '1000B',
        },
      ],
    },
    {
      key: 'webpack.assets.totalSizeByTypeMEDIA',
      label: 'Media',
      changed: false,
      biggerIsBetter: false,
      runs: [
        {
          value: 0,
          displayValue: '0B',
          delta: 0,
          displayDelta: '0%',
        },
        {
          value: 0,
          displayValue: '0B',
        },
      ],
    },
    {
      key: 'webpack.assets.totalSizeByTypeFONT',
      label: 'Fonts',
      changed: false,
      biggerIsBetter: false,
      runs: [
        {
          value: 0,
          displayValue: '0B',
          delta: 0,
          displayDelta: '0%',
        },
        {
          value: 0,
          displayValue: '0B',
        },
      ],
    },
    {
      key: 'webpack.assets.totalSizeByTypeHTML',
      label: 'HTML',
      changed: false,
      biggerIsBetter: false,
      runs: [
        {
          value: 2000,
          displayValue: '1.95KB',
          delta: 0,
          displayDelta: '0%',
        },
        {
          value: 2000,
          displayValue: '1.95KB',
        },
      ],
    },
    {
      key: 'webpack.assets.totalSizeByTypeOTHER',
      label: 'Other',
      changed: false,
      biggerIsBetter: false,
      runs: [
        {
          value: 0,
          displayValue: '0B',
          delta: 0,
          displayDelta: '0%',
        },
        {
          value: 0,
          displayValue: '0B',
        },
      ],
    },
    {
      key: 'webpack.assets.totalSizeByTypeALL',
      label: 'Total Size',
      changed: false,
      biggerIsBetter: false,
      runs: [
        {
          value: 63000,
          displayValue: '61.52KB',
          delta: 0,
          displayDelta: '0%',
        },
        {
          value: 63000,
          displayValue: '61.52KB',
        },
      ],
    },
    {
      key: 'webpack.assets.totalInitialSizeCSS',
      label: 'Initial CSS',
      changed: true,
      biggerIsBetter: false,
      runs: [
        {
          value: 10000,
          displayValue: '9.77KB',
          delta: -9.09090909,
          displayDelta: '-9.09%',
        },
        {
          value: 11000,
          displayValue: '10.74KB',
        },
      ],
    },
    {
      key: 'webpack.assets.totalInitialSizeJS',
      label: 'Initial JS',
      changed: true,
      biggerIsBetter: false,
      runs: [
        {
          value: 50000,
          displayValue: '48.83KB',
          delta: 2.04081633,
          displayDelta: '+2.04%',
        },
        {
          value: 49000,
          displayValue: '47.85KB',
        },
      ],
    },
  ],
  assets: [
    {
      key: 'main.css',
      label: 'main.css',
      changed: true,
      biggerIsBetter: false,
      runs: [
        {
          value: 10000,
          displayValue: '9.77KB',
          delta: -9.09090909,
          displayDelta: '-9.09%',
        },
        {
          value: 11000,
          displayValue: '10.74KB',
        },
      ],
    },
    {
      key: 'main.js',
      label: 'main.js',
      changed: true,
      biggerIsBetter: false,
      runs: [
        {
          value: 50000,
          displayValue: '48.83KB',
          delta: 2.04081633,
          displayDelta: '+2.04%',
        },
        {
          value: 49000,
          displayValue: '47.85KB',
        },
      ],
    },
    {
      key: 'logo.png',
      label: 'logo.png',
      changed: false,
      biggerIsBetter: false,
      runs: [
        {
          value: 1000,
          displayValue: '1000B',
          delta: 0,
          displayDelta: '0%',
        },
        {
          value: 1000,
          displayValue: '1000B',
        },
      ],
    },
    {
      key: 'index.html',
      label: 'index.html',
      changed: false,
      biggerIsBetter: false,
      runs: [
        {
          value: 2000,
          displayValue: '1.95KB',
          delta: 0,
          displayDelta: '0%',
        },
        {
          value: 2000,
          displayValue: '1.95KB',
        },
      ],
    },
  ],
};
