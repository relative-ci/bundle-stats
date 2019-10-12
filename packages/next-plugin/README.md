# next-plugin-bundle-stats

[![](https://img.shields.io/npm/v/next-plugin-bundle-stats.svg)](https://www.npmjs.com/package/next-plugin-bundle-stats)

[Next.js](https://nextjs.org) plugin for [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/bundle-stats).

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

See [bundle-stats available options](https://github.com/relative-ci/bundle-stats/tree/master/packages/bundle-stats#bundlestatswebpackpluginoptions).

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

### [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

### [relative-ci.com](https://relative-ci.com)

Continuous monitoring with BundleStats on CI:
- Github Checks integration
- support for all major CI services (Travis CI, Circle CI, Jenkins, Gitlab CI, Codeship, etc)
- free for OpenSource
