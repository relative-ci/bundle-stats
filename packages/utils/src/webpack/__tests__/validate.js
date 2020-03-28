import { validate } from '../validate';

describe('Webpack/validate', () => {
  test('should return empty string if valid', () => {
    const webpackSource = {
      assets: [],
      modules: [],
      chunks: [],
    };

    expect(validate(webpackSource)).toEqual('');
  });

  test('should return message if data is missing', () => {
    expect(validate()).toBeTruthy();
    expect(validate({})).toBeTruthy();
    expect(validate({ assets: [] })).toBeTruthy();
  });
});
