const { vol } = require('memfs');

module.exports.mkdir = vol.promises.mkdir;
module.exports.readFile = vol.promises.readFile;
module.exports.writeFile = vol.promises.writeFile;
