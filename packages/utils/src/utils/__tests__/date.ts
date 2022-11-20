import { formatDate, formatTime } from '../date';

describe('date', () => {
  test('formateDate', () => {
    expect(formatDate()).toEqual('');
    expect(formatDate('invalid')).toEqual('invalid');
    expect(formatDate('2022-11-12')).toEqual('11/12/2022');
    expect(formatDate(new Date(2022, 10, 12))).toEqual('11/12/2022');
  });
  test('formatTime', () => {
    expect(formatTime()).toEqual('');
    expect(formatTime('invalid')).toEqual('invalid');
    expect(formatTime('2022-11-12')).toEqual('00:00');
    expect(formatTime(new Date(2022, 10, 12))).toEqual('00:00');
  });
});
