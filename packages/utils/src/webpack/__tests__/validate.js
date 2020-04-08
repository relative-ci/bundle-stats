import { validate } from '../validate';

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
  });

  test('should return message if data is missing', () => {
    expect(validate()).toMatch(/assets,modules,chunks/);
    expect(validate({})).toMatch(/name,size/);
    expect(validate({ assets: [] })).toMatch(/notEmptyArray/);
    expect(validate({ assets: [{}] })).toMatch(/name,size/);
    expect(validate({ assets: [{ size: 100 }] })).toMatch(/name,size/);
    expect(
      validate({
        assets: [{ name: 'main.js', size: 100 }],
        modules: [{ name: 'module-a' }],
      }),
    ).toMatch(/name,size/);
    expect(
      validate({
        assets: [{ name: 'main.js', size: 100 }],
        modules: [{ name: 'module-a', size: 10, chunks: [1] }],
        chunks: [{ id: 1 }],
      }),
    ).toMatch(/id,entry,initial/);
  });
});
