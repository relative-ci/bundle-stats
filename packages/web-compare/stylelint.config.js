module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
  ],
  ignoreFiles: [
    'node_modules/**/*.css',
    'packages/ui/**/*.css',
  ],
};
