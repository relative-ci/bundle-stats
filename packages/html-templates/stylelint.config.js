module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
  ],
  ignoreFiles: [
    'node_modules/**/*.css',
    '../ui/**/*.css', // required for linked packages
  ],
};
