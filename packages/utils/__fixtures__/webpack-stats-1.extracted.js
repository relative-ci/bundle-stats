module.exports = {
  assets: [
    {
      name: 'main.a1b2c3.css',
      size: 10000,
    },
    {
      name: 'main.a2b3c4.js',
      size: 50000,
    },
    {
      name: 'logo.a3b4c5.png',
      size: 1000,
    },
    {
      name: 'index.html',
      size: 2000,
    },
  ],
  chunks: [
    {
      entry: true,
      id: 1,
      initial: true,
      files: [
        'main.a1b2c3.css',
        'main.a2b3c4.js',
      ],
      names: ['main'],
    },
  ],
  entrypoints: {
    main: {
      assets: [
        'main.a1b2c3.css',
        'main.a1b2c3.css.map',
        'main.a2b3c4.js',
        'main.a2b3c4.js.map',
      ],
    },
  },
  modules: [
    {
      chunks: [1],
      name: 'module-a',
      size: 1000,
    },
    {
      chunks: [1],
      name: 'module-b',
      size: 2000,
    },
    {
      chunks: [1],
      name: 'node_modules/package-a/index.js',
      size: 1000,
    },
    {
      chunks: [1],
      name: 'node_modules/package-a/node_modules/package-c/index.js',
      size: 1000,
    },
    {
      chunks: [1],
      name: 'node_modules/package-b/index.js',
      size: 1000,
    },
    {
      chunks: [1],
      name: 'node_modules/package-c/index.js',
      size: 1000,
    },
  ],
};
