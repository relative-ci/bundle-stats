import { normalizeModuleName } from './normalize-module-name';

describe('utils / normalizeModuleName', () => {
  test('should return common module name as it is', () => {
    expect(normalizeModuleName('./src/hooks/data.ts')).toEqual('./src/hooks/data.ts');
  });

  test('should return vanilla-extract module name with empty source param', () => {
    expect(
      normalizeModuleName(
        '../../node_modules/@vanilla-extract/webpack-plugin/vanilla.virtual.css?%7B%22fileName%22%3A%22src%2Fstyles%2Ftheme.css.ts.vanilla.css%22%2C%22source%22%3A%22%23H4sIAA%22%7D',
      ),
    ).toEqual(
      '../../node_modules/@vanilla-extract/webpack-plugin/vanilla.virtual.css?%7B%22fileName%22%3A%22src%2Fstyles%2Ftheme.css.ts.vanilla.css%22%2C%22source%22%3A%22...%22%7D',
    );
  });
});
