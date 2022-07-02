const { exec } = require('child_process');

test('run CLI in demo mode', (cb) => {
  exec('node ./bin/index.js --demo', (err, stdout) => {
    cb(err);
  });
});
