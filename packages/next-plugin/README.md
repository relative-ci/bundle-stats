# next-plugin-bundle-stats

[![](https://img.shields.io/npm/v/next-plugin-bundle-stats.svg)](https://www.npmjs.com/package/next-plugin-bundle-stats)

[Next.js](https://nextjs.org) plugin for [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin).

## Description

Generate bundle report(bundle size, assets, modules) and compare the results between different builds.

## How to install

```shell
npm install --dev next-plugin-bundle-stats
```

or

```shell
yarn add --dev next-plugin-bundle-stats
```

## Available options

See [bundle-stats-webpack-plugin options](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin#bundlestatswebpackpluginoptions).

## Examples of usage

```js
// In your next.config.js
const withBundleStats = require('next-plugin-bundle-stats');

module.exports = withBundleStats();
```

or with custom options:
```js
// In your next.config.js
const withBundleStats = require('next-plugin-bundle-stats');

module.exports = withBundleStats({
  outDir: '../artifacts'
});
```

## Related projects

### :cyclone: [relative-ci.com](https://relative-ci.com)

Specialized insights for web bundles:

- Monitor and analyze bundle size, assets, modules, packages on every build
- Github Check and Slack integrations
- Support for all major CI services (Travis CI, Circle CI, Jenkins, Gitlab CI, Codeship, etc)
- Free for Developers & OpenSource

[Try Beta](https://relative-ci.com)

### :first_quarter_moon: [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)

### :zap: [bundle-stats-action](https://github.com/vio/bundle-stats-action)

Github Action that generates [bundle-stats](https://github.com/relative-ci/bundle-stats) reports for webpack.
