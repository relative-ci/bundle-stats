import { getDelta, formatDelta } from '../delta';

test('getDelta', () => {
  expect(getDelta(null, null)).toEqual(0);
  expect(getDelta({ value: 100 }, null)).toEqual(-100);
  expect(getDelta(null, { value: 100 })).toEqual(100);
  expect(getDelta({ value: 100 }, { value: 0 })).toEqual(-100);
  expect(getDelta({ value: 0 }, { value: 100 })).toEqual(100);
  expect(getDelta({ value: 100 }, { value: 101 })).toEqual(1);
  expect(getDelta({ value: 101 }, { value: 100 })).toEqual(-0.99009901);
});

test('formatDeta', () => {
  expect(formatDelta(0)).toEqual('0%');
  expect(formatDelta(10)).toEqual('+10%');
  expect(formatDelta(-10)).toEqual('-10%');
  expect(formatDelta(0.001)).toEqual('~+0.01%');
  expect(formatDelta(-0.001)).toEqual('~-0.01%');
});
