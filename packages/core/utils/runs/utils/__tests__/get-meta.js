import getMeta from '../get-meta';

test('Extract meta', () => {
  const actual = getMeta(
    {
      a: {
        b: {
          c: 1,
        },
      },
      b: 'value',
    },
    {
      testA: 'a.b.c',
      testB: 'b',
    },
  );

  const expected = {
    testA: 1,
    testB: 'value',
  };

  expect(actual).toEqual(expected);
});
