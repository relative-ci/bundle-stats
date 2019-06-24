<p align="center">
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank"><img alt="BundleStats screenshot" width="480" src="https://www.dropbox.com/s/8t6m6rruaauwlxq/bundle-stats-screenshot-4.jpg?raw=1"/></a>
</p>
<h1 align="center">Bundle Stats</h1>
<p align="center">
<strong>
  Reports for bundle changes (assets, chunks, modules).
</strong>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bundle-stats"><img src="https://img.shields.io/npm/v/bundle-stats.svg" /></a>
  <img src="https://img.shields.io/node/v/bundle-stats.svg" alt="Node version" />
  <a href="https://travis-ci.org/bundle-stats/bundle-stats"><img alt="TravisCI badge" src="https://api.travis-ci.org/bundle-stats/bundle-stats.svg?branch=master"/></a>
  <img alt="Renovate" src="https://badges.renovateapi.com/github/bundle-stats/bundle-stats?v=1" />
</p>

## Table of Contents
- [Features](#1-features)
- [Webpack plugin](#2-webpack-plugin)
  - [Install](#install)
  - [Webpack configuration](#webpack-configuration)
- [CLI](#3-cli)
  - [Install as global dependency](#install-as-global-dependency)
  - [Install as dev dependency](#install-as-dev-dependency)
  - [Webpack configuration](#webpack-configuration-1)
  - [Usage](#usage)
- [Standalone web application](#4-standalone-web-application)
- [:zap: Running on CI](#5-running-on-ci)

## 1. Features

- Totals report - total bundle size and breakdown by asset category (css, js, img, etc)
- Assets report - added, removed, changed, initial, entry points
- Modules report - modules added/removed/changed by chunk
- Side by side comparison between multiple jobs

View demo reports:
- [Single job](https://relative-ci.com/tools/webpack-bundle-stats/demo-single-job.html)
- [Multiple jobs](https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html)

## 2. Webpack plugin

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

#### `BundleStatsWebpackPlugin(options)`

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

## 3. CLI

### Install as global

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
  ✔ Gather data
  ✔ Generate reports
  ✔ Save reports

Reports saved:
- ./dist/bundle-stats.html
- ./dist/bundle-stats.json
```

## 4. Standalone web application

Use https://compare.relative-ci.com to compare Webpack/Lighthouse/Browsertime stats.

[Read more](/packages/web-compare)

## 5. :zap: Running on CI

[Read more about running BundleStats on CI (BETA)](https://relative-ci.com)

## 6. Packages

### [`bundle-stats`](/packages/cli)

Generate bundle report based on Webpack stats data.

### [`@bundle-stats/web-compare`](/packages/web-compare)
Side by side comparison for webpack/lighthouse/browsertime stats - https://compare.relative-ci.com.

### [`@bundle-stats/html-templates`](/packages/html-templates)
HTML templates for report generation.

### [`@bundle-stats/ui`](/packages/ui)
UI components for BundleStats projects.

### [`@bundle-stats/utils`](/packages/utils)
Utilities for BundleStats projects.
