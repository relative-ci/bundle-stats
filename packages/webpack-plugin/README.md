<p align="center">
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank"><img alt="BundleStats screenshot" width="640" src="https://raw.githubusercontent.com/relative-ci/bundle-stats/master/bundle-stats.png"/></a>
</p>
<h1 align="center">BundleStats</h1>
<p align="center">
  Analyze webpack stats(bundle size, assets, modules, packages) and compare the results between different builds.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bundle-stats"><img src="https://img.shields.io/npm/v/bundle-stats.svg" /></a>
  <img src="https://img.shields.io/node/v/bundle-stats.svg" alt="Node version" />
  <a href="https://circleci.com/gh/relative-ci/bundle-stats"><img alt="CircleCI badge" src="https://circleci.com/gh/relative-ci/bundle-stats.svg"/></a>
  <img alt="Renovate" src="https://badges.renovateapi.com/github/relative-ci/bundle-stats?v=1" />
  <a href="https://lgtm.com/projects/g/relative-ci/bundle-stats/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/relative-ci/bundle-stats.svg?logo=lgtm&logoWidth=18"/></a>
</p>
<p align="center">
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/"><strong>Bundle size</strong> and totals by file type(css, js, img, etc)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/"><strong>Cache invalidation</strong>, Initial JS/CSS and other bundle specific metrics</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/assets"><strong>Assets</strong> report (entrypoint, initial, types, changed, delta)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/modules"><strong>Modules</strong> report (changed, delta) by chunk</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/packages"><strong>Packages</strong> report (count, duplicate, changed, delta)</a><br />
:star: <strong>Side by side comparison</strong> for multiple builds
</p>

## Table of Contents
- [Install](#install)
- [Webpack configuration](#webpack-configuration)
  - [BundleStatsWebpackPlugin(options)](#bundlestatswebpackpluginoptions)
  - [Use with create-react-app](#use-with-create-react-app)
- [Compare mode](#compare-mode)
- [Framework specific plugins](#framework-specific-plugins)
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
      context: WEBPACK_CONTEXT,
      assets: true,
      entrypoints: true,
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

## Framework specific plugins

- [Gatsby](https://github.com/relative-ci/bundle-stats/tree/master/packages/gatsby-plugin)
- [Next](https://github.com/relative-ci/bundle-stats/tree/master/packages/next-plugin)

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
