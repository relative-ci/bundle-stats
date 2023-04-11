<p align="center">
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank"><img alt="BundleStats screenshot" src="https://raw.githubusercontent.com/relative-ci/bundle-stats/master/bundle-stats.gif"/></a>
</p>
<p align="center">
  <strong>Demo:</strong>
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank">Compare multiple builds</a>,
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-single-job.html" target="_blank">Single build</a>
</p>
<h1 align="center">BundleStats webpack plugin</h1>
<p align="center">
  Analyze webpack stats(bundle size, assets, modules, packages) and compare the results between different builds.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bundle-stats-webpack-plugin"><img src="https://img.shields.io/npm/v/bundle-stats-webpack-plugin.svg" /></a>
  <a href="https://www.npmjs.com/package/bundle-stats-webpack-plugin"><img src="https://img.shields.io/npm/dm/bundle-stats-webpack-plugin.svg" /></a>
  <img src="https://img.shields.io/node/v/bundle-stats-webpack-plugin.svg" alt="Node version" />
  <a href="https://github.com/relative-ci/bundle-stats/actions/workflows/build.yaml"><img alt="GitHub action" src="https://github.com/relative-ci/bundle-stats/actions/workflows/build.yaml/badge.svg" /></a>
  <a href="https://github.com/relative-ci/bundle-stats/actions/workflows/codeql.yml"><img alt="CodeQL" src="https://github.com/relative-ci/bundle-stats/actions/workflows/codeql.yml/badge.svg"/></a>
</p>
<p align="center">
  <a href="https://app.relative-ci.com/projects/V1bXuieJbYttHCS75L8G"><img src="https://badges.relative-ci.com/badges/V1bXuieJbYttHCS75L8G?branch=master" alt="RelativeCI"></a>
</p>
<p align="center">
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/"><strong>Bundle size</strong> and totals by file type(css, js, img, etc)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/"><strong>Cache invalidation</strong>, Initial JS/CSS and other bundle specific metrics</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/assets"><strong>Assets</strong> report (entrypoint, initial, types, changed, delta)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/modules"><strong>Modules</strong> report (changed, delta, chunks, duplicate count and percentage)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/packages"><strong>Packages</strong> report (count, duplicate, changed, delta)</a><br />
:star: <strong>Side by side comparison</strong> for multiple builds
</p>

## Table of Contents
- [Install](#install)
- [Webpack configuration](#webpack-configuration)
  - [BundleStatsWebpackPlugin(options)](#bundlestatswebpackpluginoptions)
  - [Use with create-react-app](#use-with-create-react-app)
- [Compare mode](#compare-mode)
- [Other packages](#other-packages)
- [Related projects](#related-projects)

## Install

```shell
npm install --dev bundle-stats-webpack-plugin
```

or

```shell
yarn add --dev bundle-stats-webpack-plugin
```

## Webpack configuration

```js
// webpack.config.js
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');

module.exports = {
  ...,
  plugins: [
    new BundleStatsWebpackPlugin()
  ]
}
```

### `BundleStatsWebpackPlugin(options)`

- `compare` - use local saved stats for comparison (default `true`).
- `baseline` - save current webpack stats as baseline (default `false`).
- `html` - output html report (default `true`).
- `json` - output json report (default `false`).
- `outDir` - output directory relative to webpack `output.path` (default `''`).
- `silent` - stop logging info and only log warning and error (default `false`).
- `stats` - [Webpack stats](https://webpack.js.org/configuration/stats) options
  default:
  ```js
  {
    stats: {
      assets: true,
      chunks: true,
      modules: true,
      builtAt: true,
      hash: true
    }
  }
  ```

### Use with create-react-app

You will need to customize the default webpack config. That can be done by using [react-app-rewired](https://github.com/timarney/react-app-rewired) which is one of create-react-app's custom config solutions. You will also need [customize-cra](https://github.com/arackaf/customize-cra).

```shell
npm install --dev customize-cra react-app-rewired
```

or

```shell
yarn add customize-cra react-app-rewired --dev
```

Change your default scripts in `package.json` to:

```json
/* package.json */
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test"
}
```

Create a file `config-overrides.js` at the same level as `package.json`.

```js
// config-overrides.js
const { override, addWebpackPlugin } = require('customize-cra');
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');

module.exports = override(
  addWebpackPlugin(new BundleStatsWebpackPlugin()),
);
```

## Compare mode

In `compare` mode, the metrics are compared against an existing(`node_modules/.cache/bundle-stats/baseline.json`) Webpack stats file(baseline). To generate the baseline webpack stats, set `BUNDLE_STATS_BASELINE` environmental variable to `true` or set `BundleStatsWebpackPlugin` `baseline` option to `true`:

```shell
# Checkout to the branch/tag/commit where you want to generate the baseline
$ git checkout master

# Build your application with BUNDLE_STATS_BASELINE environmental variable
$ BUNDLE_STATS_BASELINE=true npm run build

# Checkout to the working branch/tag/commit
$ git checkout MY_FEATURE_BRANCH

# Build your application
$ npm run build
```

The option can be disabled by setting `BundleStatsWebpackPlugin` `compare` option to `false`.

## Other packages

### [`bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/cli)

[![npm](https://img.shields.io/npm/v/bundle-stats)](https://www.npmjs.com/package/bundle-stats) [![npm](https://img.shields.io/npm/dm/bundle-stats)](https://www.npmjs.com/package/bundle-stats)

CLI to generate bundle stats report.

### [`gatsby-plugin-bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/gatsby-plugin)

[![npm](https://img.shields.io/npm/v/gatsby-plugin-bundle-stats)](https://www.npmjs.com/package/gatsby-plugin-bundle-stats) [![npm](https://img.shields.io/npm/dm/gatsby-plugin-bundle-stats)](https://www.npmjs.com/package/gatsby-plugin-bundle-stats)

[Gatsby](https://www.gatsbyjs.org) plugin for [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin).

### [`next-plugin-bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/next-plugin)

[![npm](https://img.shields.io/npm/v/next-plugin-bundle-stats)](https://www.npmjs.com/package/next-plugin-bundle-stats) [![npm](https://img.shields.io/npm/dm/next-plugin-bundle-stats)](https://www.npmjs.com/package/next-plugin-bundle-stats)

[Next.js](https://nextjs.org) plugin for [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin).

## Related projects

### :cyclone: [relative-ci.com](https://relative-ci.com?utm_medium=bundle-stats-webpack-plugin)

#### In-depth webpack bundle analysis and monitoring

RelativeCI automates webpack bundle analysis, monitoring, and alerting so you can identify and fix bundle regressions before shipping to production:

- :crystal_ball: Analyze webpack bundle stats on every build
- :chart_with_upwards_trend: Monitor webpack bundle stats changes and identify tendencies over extended periods
- :bell: Get notified via GitHub Checks, GitHub Pull Request comments, and Slack notifications
- :hammer: Support for all major CI services (CircleCI, GitHub Actions, Gitlab CI, Jenkins, Travis CI)
- :two_hearts: Always free for Open Source

[Try for free](https://relative-ci.com?utm_medium=bundle-stats-webpack-plugin)

### :first_quarter_moon: [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)

### :zap: [bundle-stats-action](https://github.com/vio/bundle-stats-action)

Github Action that generates [bundle-stats](https://github.com/relative-ci/bundle-stats) reports.

