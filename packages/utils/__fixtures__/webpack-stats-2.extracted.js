module.exports = {
  builtAt: 1546300800000,
  hash: 'defg1234',
  assets: [
    {
      name: 'main.b1c2d3e.css',
      size: 11000,
    },
    {
      name: 'main.b2c3d4e.js',
      size: 49000,
    },
    {
      name: 'logo.a3b4c5d.png',
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
      files: ['main.b1c2d3e.css', 'main.b2c3d4e.js'],
      names: ['main'],
    },
  ],
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
