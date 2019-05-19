import { groupModulesByChunk } from '../group-modules-by-chunk';

test('Group modules by chunk', () => {
  const actual = groupModulesByChunk([
    { name: 'file-a.js', chunks: [0] },
    { name: 'file-b.js', chunks: [0] },
    { name: 'file-c.js', chunks: [0, 1] },
    { name: 'file-d.js', chunks: [2] },
    { name: 'file-e.js', chunks: [] },
  ]);

  const expected = {
    0: [
      { name: 'file-a.js', chunks: [0] },
      { name: 'file-b.js', chunks: [0] },
      { name: 'file-c.js', chunks: [0, 1] },
    ],
    1: [
      { name: 'file-c.js', chunks: [0, 1] },
    ],
    2: [
      { name: 'file-d.js', chunks: [2] },
    ],
  };

  expect(expected).toEqual(actual);
});
