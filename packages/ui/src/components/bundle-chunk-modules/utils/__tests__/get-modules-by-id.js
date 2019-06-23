import { getModuleName } from '../get-modules-by-id';

test('getModuleName', () => {
  expect(getModuleName('./src/default.css')).toEqual('./src/default.css');
  expect(getModuleName('css ./node_modules/css-loader/dist/cjs.js??ref--6-0!./src/assets/styles/default.styl'))
    .toEqual('./src/assets/styles/default.styl');
  expect(getModuleName('./src/index.jsx + 27 modules')).toEqual('./src/index.jsx');
});
