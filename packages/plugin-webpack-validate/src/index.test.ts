import validate from '.';

describe('Webpack/validate', () => {
  test('should return empty string if valid', () => {
    const webpackSource = {
      assets: [
        {
          name: 'main.js',
          size: 100,
          emitted: true,
          chunks: [1, 2],
        },
      ],
    };

    expect(validate(webpackSource)).toEqual('');
    expect(validate({ ...webpackSource, modules: [] })).toEqual('');
    expect(
      validate({
        ...webpackSource,
        modules: [
          {
            name: 'node_modules/package-a/main.js',
            size: 10,
            chunks: [1],
          },
          {
            type: 'hidden modules',
            filteredChildren: 2,
            size: 10,
          },
        ],
      }),
    ).toEqual('');
    expect(
      validate({
        ...webpackSource,
        modules: [
          {
            name: './main.js  + 2 concantenated modules',
            size: 10,
            chunks: [1],
            modules: [
              {
                name: './main.js',
                size: 3,
              },
              {
                name: './main-dependency-1.js',
                size: 4,
              },
              {
                name: './main-dependency-2.js',
                size: 3,
              },
            ],
          },
        ],
      }),
    ).toEqual('');
    expect(validate({ ...webpackSource, chunks: [] })).toEqual('');
    expect(
      validate({
        ...webpackSource,
        chunks: [
          {
            names: ['main'],
            entry: true,
            initial: true,
            id: 1,
            files: ['main.js'],
          },
        ],
      }),
    ).toEqual('');

    expect(
      validate({
        assets: [
          {
            type: 'hidden assets',
            filteredChildren: 2,
            size: 100,
          },
          ...webpackSource.assets,
        ],
      }),
    ).toEqual('');

    expect(
      validate({
        ...webpackSource,
        chunks: [
          {
            names: [],
            entry: false,
            initial: false,
            id: null,
            files: ['main.js'],
          },
        ],
      }),
    ).toEqual('');
  });

  test('should return message if data is missing', () => {
    expect(validate()).toMatch(/undefined/);
    expect(validate({})).toMatch(/assets/);
    expect(validate({ assets: [] })).toMatch(/nonempty/);
    expect(validate({ assets: [{}] })).toMatch(/size/);
    expect(validate({ assets: [{ size: 100 }] })).toMatch(/name/);
    expect(
      validate({
        assets: [{ name: 'main.js', size: 100 }],
        modules: [{ name: 'module-a' }],
      }),
    ).toMatch(/size/);
    expect(
      validate({
        assets: [{ name: 'main.js', size: 100 }],
        modules: [{ name: 'module-a', size: 10, chunks: [1] }],
        chunks: [{ id: 1 }],
      }),
    ).toMatch(/entry/);
  });
});
