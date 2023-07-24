const { exec } = require('child_process');

describe('CLI', () => {
  test('should generate demo report', (cb) => {
    exec('npx bundle-stats --demo', (err, stdout) => {
      cb(err);
    });
  });

  test('should generate single report', (cb) => {
    exec('npx bundle-stats ../../__fixtures__/webpack-stats-current.json', (err, stdout) => {
      cb(err);
    });
  });

  test('should generate compared report', (cb) => {
    exec(
      'npx bundle-stats ../../__fixtures__/webpack-stats-current.json ../../__fixtures__/webpack-stats-baseline.json',
      (err, stdout) => {
        cb(err);
      },
    );
  });
});
