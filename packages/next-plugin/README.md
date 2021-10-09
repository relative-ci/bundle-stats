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

- Analyze and monitor webpack stats(bundle size, assets, modules, packages)
- GitHub Check, GitHub Pull Request, and Slack integrations
- Support for all major CI services (CircleCI, GitHub Actions, Gitlab CI, Jenkins, Travis CI)
- Free for OpenSource, developers and small teams

[Try for free](https://relative-ci.com?utm_source=github&utm_medium=bundle-stats)

### :first_quarter_moon: [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)

### :zap: [bundle-stats-action](https://github.com/vio/bundle-stats-action)

Github Action that generates [bundle-stats](https://github.com/relative-ci/bundle-stats) reports for webpack.
