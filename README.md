<p align="center">
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank"><img alt="BundleStats screenshot" width="480" src="https://camo.githubusercontent.com/fc18c7594187a7d19adfe50a624951461b80e6ae/68747470733a2f2f7777772e64726f70626f782e636f6d2f732f767a796c78677431657237797a6c352f7765627061636b2d62756e646c652d73746174732d73637265656e73686f742e76362e6a70673f7261773d31"/></a>
</p>
<h1 align="center">BundleStats</h1>
<p align="center">
  Generate bundle report(bundle size, assets, modules) and compare the results between different builds.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bundle-stats"><img src="https://img.shields.io/npm/v/bundle-stats.svg" /></a>
  <img src="https://img.shields.io/node/v/bundle-stats.svg" alt="Node version" />
  <a href="https://travis-ci.org/bundle-stats/bundle-stats"><img alt="TravisCI badge" src="https://api.travis-ci.org/bundle-stats/bundle-stats.svg?branch=master"/></a>
  <img alt="Renovate" src="https://badges.renovateapi.com/github/bundle-stats/bundle-stats?v=1" />
  <a href="https://app.relative-ci.com/projects/og7ULMMCOgGWXBxRJocI"><img alt="RelativeCI badge" src="https://img.shields.io/badge/RelativeCI-enabled-brightgreen.svg" /></a>
  <a href="https://lgtm.com/projects/g/bundle-stats/bundle-stats/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/bundle-stats/bundle-stats.svg?logo=lgtm&logoWidth=18"/></a>
</p>
<p align="center">
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#totals"><strong>Bundle size</strong> and totals by file type(css, js, img, etc)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#totals"><strong>Cache invalidation</strong>, Initial JS/CSS and other bundle specific metrics</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#assets"><strong>Assets</strong> report (entrypoint, initial, types, changed, delta)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#modules"><strong>Modules</strong> report (changed, delta) by chunk</a><br />
:star: <strong>Side by side comparison</strong> for multiple jobs
</p>

## Table of Contents
- [Webpack plugin](#1-webpack-plugin)
  - [Install](#install)
  - [Webpack configuration](#webpack-configuration)
  - [Compare mode](#compare-mode)
- [CLI](#2-cli)
  - [Install as global dependency](#install-as-global-dependency)
  - [Install as dev dependency](#install-as-dev-dependency)
  - [Webpack configuration](#webpack-configuration-1)
  - [Usage](#usage)
  - [Compare mode](#compare-mode-1)
- [Gatsby plugin](#3-gatsby-plugin)
- [Next.js plugin](#4-nextjs-plugin)
- [Standalone web application](#5-standalone-web-application)
- [:zap: Running on CI](#6-zap-running-on-ci)
- [Packages](#7-packages)

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
    }
  }
  ```

### Compare mode

In `compare` mode, the metrics are compared against an existing Webpack stats file(baseline). To generate the baseline webpack stats, set `BUNDLE_STATS_BASELINE` environmental variable to `true` or set `BundleStatsWebpackPlugin` `baseline` option to `true`:

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
    modules: true
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

In `compare` mode, the metrics are compared against an existing Webpack stats file(baseline). To generate the baseline webpack stats, use `--baseline` option:

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

## 3. Gatsby plugin

Install `bundle-stats` as a Gatsby plugin.

[Read more](packages/gatsby-plugin)

## 4. Next.js plugin

Install `bundle-stats` as a Next.js plugin.

[Read more](../next-plugin)

## 5. Standalone web application

Use https://compare.relative-ci.com to compare Webpack/Lighthouse/Browsertime stats.

[Read more](packages/web-compare)

## 6. :zap: Running on CI

Continuous monitoring with BundleStats on CI:
- Github Checks integration
- support for all major CI services (Travis CI, Circle CI, Jenkins, Gitlab CI, Codeship, etc)
- free for OpenSource

[Read more about running BundleStats on CI (BETA)](https://relative-ci.com)

## 7. Packages

### [`bundle-stats`](packages/cli)

Generate bundle report based on Webpack stats data.

### [`gatsby-plugin-bundle-stats`](packages/gatsby-plugin)

Gatsby plugin for bundle stats

### [`next-plugin-bundle-stats`](packages/next-plugin)

Gatsby plugin for bundle stats

### [`@bundle-stats/web-compare`](packages/web-compare)
Side by side comparison for webpack/lighthouse/browsertime stats - https://compare.relative-ci.com.

### [`@bundle-stats/html-templates`](packages/html-templates)
HTML templates for report generation.

### [`@bundle-stats/ui`](packages/ui)
UI components for BundleStats projects.

### [`@bundle-stats/utils`](packages/utils)
Utilities for BundleStats projects.
