module.exports = {
  assets: [
    {
      name: 'main.b1c2d3.css',
      size: 11000,
    },
    {
      name: 'main.b2c3d5.js',
      size: 49000,
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
        'main.b1c2d3.css',
        'main.b2c3d5.js',
      ],
      names: ['main'],
    },
  ],
  entrypoints: {
    main: {
      assets: [
        'main.b1c2d3.css',
        'main.b1c2d3.css.map',
        'main.b2c3d5.js',
        'main.b2c3d5.js.map',
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
      size: 1500,
    },
    {
      chunks: [1],
      name: 'node_modules/package-a/index.js',
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
