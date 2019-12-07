<p align="center">
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank"><img alt="BundleStats screenshot" width="640" src="https://camo.githubusercontent.com/fbd1e95797391e0b0ed5d4926040ae01cc2e5476/68747470733a2f2f7777772e64726f70626f782e636f6d2f732f7679746875616d353567637a366e612f62756e646c652d73746174732d312e31342e6a70673f7261773d31"/></a>
</p>
<h1 align="center">BundleStats</h1>
<p align="center">
  Generate bundle report(bundle size, assets, modules, packages) and compare the results between different builds.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bundle-stats"><img src="https://img.shields.io/npm/v/bundle-stats.svg" /></a>
  <img src="https://img.shields.io/node/v/bundle-stats.svg" alt="Node version" />
  <a href="https://travis-ci.org/relative-ci/bundle-stats"><img alt="TravisCI badge" src="https://api.travis-ci.org/relative-ci/bundle-stats.svg?branch=master"/></a>
  <img alt="Renovate" src="https://badges.renovateapi.com/github/relative-ci/bundle-stats?v=1" />
  <a href="https://lgtm.com/projects/g/relative-ci/bundle-stats/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/relative-ci/bundle-stats.svg?logo=lgtm&logoWidth=18"/></a>
</p>
<p align="center">
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#totals"><strong>Bundle size</strong> and totals by file type(css, js, img, etc)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#totals"><strong>Cache invalidation</strong>, Initial JS/CSS and other bundle specific metrics</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#assets"><strong>Assets</strong> report (entrypoint, initial, types, changed, delta)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#modules"><strong>Modules</strong> report (changed, delta) by chunk</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#packages"><strong>Packages</strong> report (count, duplicate, changed, delta)</a><br />
:star: <strong>Side by side comparison</strong> for multiple jobs
</p>

## Table of Contents
- [Webpack plugin](#1-webpack-plugin)
  - [Install](#install)
  - [Webpack configuration](#webpack-configuration)
  - [Use with create-react-app](#use-with-create-react-app)
  - [Compare mode](#compare-mode)
- [CLI](#2-cli)
  - [Install as global dependency](#install-as-global-dependency)
  - [Install as dev dependency](#install-as-dev-dependency)
  - [Webpack configuration](#webpack-configuration-1)
  - [Usage](#usage)
  - [Compare mode](#compare-mode-1)
- [Framework specific plugins](#3-framework-specific-plugins)
- [Related projects](#4-related-projects)

## 1. Webpack plugin

### Install

```shell
npm install --dev bundle-stats
```

or

```shell
yarn add --dev bundle-stats
```

### Webpack configuration

```js
// webpack.config.js
const { BundleStatsWebpackPlugin } = require('bundle-stats');

module.exports = {
  ...,
  plugins: [
    new BundleStatsWebpackPlugin()
  ]
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
const { BundleStatsWebpackPlugin } = require('bundle-stats');

module.exports = override(
  addWebpackPlugin(new BundleStatsWebpackPlugin()),
);
```

### `BundleStatsWebpackPlugin(options)`

- `compare` - use local saved stats for comparison (default `true`).
- `baseline` - save current webpack stats as baseline (default `false`).
- `html` - output html report (default `true`).
- `json` - output json report (default `false`).
- `outDir` - output directory relative to `output.path` (default `''`).
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

### Compare mode

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

## 2. CLI

### Install as global dependency

```shell
npm install -g bundle-stats
```

or

```shell
yarn global add bundle-stats
```

### Install as dev dependency

```shell
npm install --dev bundle-stats
```

or

```shell
yarn add --dev bundle-stats
```

### Webpack configuration

The CLI is consuming the Webpack stats json. The following [stats options](https://webpack.js.org/configuration/stats) are required:
```js
{
  stats: {
    assets: true,
    entrypoints: true,
    chunks: true,
    modules: true,
    builtAt: true,
    hash: true
  }
}
```

[Read more about Webpack stats configuration](https://relative-ci.com/documentation/setup#1-configure-webpack)

### Usage

```shell
$ bundle-stats -h
Usage: bundle-stats OPTIONS [WEBPACK_STATS_FILE]...

Options:
  --compare      Use local saved stats for comparison  [boolean] [default: true]
  --baseline     Save current stats as baseline       [boolean] [default: false]

  --html         Save HTML report                      [boolean] [default: true]
  --json         Save JSON data                       [boolean] [default: false]

  --demo         Generate demo reports                          [default: false]

  -d, --out-dir  Output directory                            [default: "./dist"]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

```shell
$ bundle-stats --html --json __fixtures__/webpack-stats-0.json __fixtures__/webpack-stats-1.json
  ✔ Read Webpack stat files
  ✔ Read baseline data
  ↓ Write baseline data [skipped]
    → Not a baseline job (see --baseline).
  ✔ Gather data
  ✔ Generate reports
  ✔ Save reports

Reports saved:
- ./dist/bundle-stats.html
- ./dist/bundle-stats.json
```

### Compare mode

In `compare` mode, the metrics are compared against an existing(`node_modules/.cache/bundle-stats/baseline.json`) Webpack stats file(baseline). To generate the baseline webpack stats, use `--baseline` option:

```shell
# Checkout to the branch/tag/commit where you want to generate the baseline
$ git checkout master

# Build your application
$ npm run build

# Run bundle-stats with --baseline option. This will save the baseline data on node_modules/.cache/bundle-stats/baseline.json
$ bundle-stats --baseline artifacts/webpack-stats.json
 ✔ Read Webpack stat files
 ↓ Read baseline data [skipped]
   → Missing baseline stats, see "--baseline" option.
 ✔ Write baseline data
 ✔ Process data
 ✔ Generate reports
 ✔ Save reports

Reports saved:
- ./dist/bundle-stats.html

# Checkout to the working branch/tag/commit
$ git checkout MY_FEATURE_BRANCH

# Build your application
$ npm run build

# Run bundle-stats - the report is going to compare the current data against the generated baseline
$ bundle-stats artifacts/webpack-stats.json
 ✔ Read Webpack stat files
 ✔ Read baseline data
 ↓ Write baseline data [skipped]
   → Not a baseline job (see --baseline).
 ✔ Process data
 ✔ Generate reports
 ✔ Save reports

Reports saved:
- ./dist/bundle-stats.html
```

The option can be disabled using `--no-compare` option.

## 3. Framework specific plugins

- [Gatsby](https://github.com/relative-ci/bundle-stats/tree/master/packages/gatsby-plugin)
- [Next](https://github.com/relative-ci/bundle-stats/tree/master/packages/next-plugin)

## 4. Related projects

### [relative-ci.com](https://relative-ci.com)

Continuous monitoring for webpack bundles:
- Monitor and analyze bundle size, assets, modules, packages
- Github Checks, Slack integration
- Support for all major CI services (Travis CI, Circle CI, Jenkins, Gitlab CI, Codeship, etc)
- Free for OpenSource

[Try Beta](https://relative-ci.com)

### [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)
