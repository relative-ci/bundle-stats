import { formatFileSize, formatPercentage } from '../format';
import { getDelta, formatDelta } from '../delta';

test('getDelta', () => {
  expect(getDelta(null, null)).toEqual({ delta: 0, deltaPercentage: 0 });
  expect(getDelta({ value: 100 }, null)).toEqual({ delta: -100, deltaPercentage: -100 });
  expect(getDelta(null, { value: 100 })).toEqual({ delta: 100, deltaPercentage: 100 });
  expect(getDelta({ value: 100 }, { value: 0 })).toEqual({ delta: -100, deltaPercentage: -100 });
  expect(getDelta({ value: 0 }, { value: 100 })).toEqual({ delta: 100, deltaPercentage: 100 });
  expect(getDelta({ value: 100 }, { value: 101 })).toEqual({ delta: 1, deltaPercentage: 1 });
  expect(getDelta({ value: 101 }, { value: 100 })).toEqual({
    delta: -1,
    deltaPercentage: -0.99009901,
  });
});

test('formatDelta', () => {
  expect(formatDelta(0, formatPercentage)).toEqual('0%');
  expect(formatDelta(10, formatPercentage)).toEqual('+10%');
  expect(formatDelta(-10, formatPercentage)).toEqual('-10%');
  expect(formatDelta(0.001, formatPercentage)).toEqual('~+0.01%');
  expect(formatDelta(-0.001, formatPercentage)).toEqual('~-0.01%');

  expect(formatDelta(0, formatFileSize)).toEqual('0B');
  expect(formatDelta(10, formatFileSize)).toEqual('+10B');
  expect(formatDelta(-10, formatFileSize)).toEqual('-10B');
  expect(formatDelta(0.001, formatFileSize)).toEqual('~+0.01B');
  expect(formatDelta(-0.001, formatFileSize)).toEqual('~-0.01B');
});
