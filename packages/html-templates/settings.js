/* env node */
const { resolve } = require('path');
const dotenv = require('dotenv');
const globalSettings = require('../../build/settings');

const rootDir = __dirname;
const srcDir = resolve(rootDir, 'src');
const distDir = resolve(rootDir, 'dist');
const publicDir = resolve(rootDir, 'public');

dotenv.config();

module.exports = {
  ...globalSettings,
  rootDir,
  srcDir,
  distDir,
  publicDir,
};
