const { resolve } = require('path');
const dotenv = require('dotenv');

const rootDir = resolve(__dirname, '..');
const srcDir = resolve(rootDir, 'src');
const distDir = resolve(rootDir, 'dist');
const publicDir = resolve(rootDir, 'public');
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

dotenv.config();

module.exports = {
  rootDir,
  srcDir,
  distDir,
  publicDir,
  isDevelopment,
  isProduction,
};
