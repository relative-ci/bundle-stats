module.exports = {
  assets: [
    {
      name: 'main.css',
      size: 11000,
    },
    {
      name: 'main.js',
      size: 49000,
    },
    {
      name: 'logo.png',
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
        'main.css',
        'main.js',
      ],
      names: ['main'],
    },
  ],
  entrypoints: {
    main: {
      assets: [
        'main.css',
        'main.css.map',
        'main.js',
        'main.js.map',
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
  ],
};
