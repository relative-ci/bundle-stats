<p align="center">
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank"><img alt="BundleStats screenshot" width="480" src="https://www.dropbox.com/s/8t6m6rruaauwlxq/bundle-stats-screenshot-4.jpg?raw=1"/></a>
</p>
<h1 align="center">Bundle Stats</h1>
<p align="center">
<strong>
  In-depth reports for bundle changes (assets, chunks, modules).
</strong>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bundle-stats"><img src="https://img.shields.io/npm/v/bundle-stats.svg" /></a>
  <img src="https://img.shields.io/node/v/bundle-stats.svg" alt="Node version" />
  <a href="https://travis-ci.org/bundle-stats/bundle-stats"><img alt="TravisCI badge" src="https://api.travis-ci.org/bundle-stats/bundle-stats.svg?branch=master"/></a>
  <img alt="Renovate" src="https://badges.renovateapi.com/github/bundle-stats/bundle-stats?v=1" />
</p>

## Demo

- [Single job](https://relative-ci.com/tools/webpack-bundle-stats/demo-single-job.html)
- [Multiple jobs](https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html)

## Webpack plugin

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
const { WebpackStatsBundlePlugin } = require('bundle-stats');

module.exports = {
  ...,
  plugins: [
    new WebpackStatsBundlePlugin()
  ]
}
```

#### `WebpackStatsBundlePlugin(options)`

- `html` - output html report (default `true`).
- `json` - output json report (default `false`).
- `ourDir` - output directory relative to `output.path` (default `''`).
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

## CLI

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
- ./dist/report.html
- ./dist/report.json
```

## Standalone web application

Use https://compare.relative-ci.com for comparing Webpack/Lighthouse/Browsertime stats:

[Read more](packages/web-compare#readme)

## Packages

### [`bundle-stats`](/packages/cli)

Generate bundle report based on Webpack stats data.

### [`@bundle-stats/web-compare`](packages/web-compare)
Side by side comparison for webpack/lighthouse/browsertime stats - https://compare.relative-ci.com.

### [`@bundle-stats/html-templates`](/packages/html-templates)
HTML templates for report generation.

### [`@bundle-stats/ui`](/packages/ui)
UI components for BundleStats projects.

### [`@bundle-stats/utils`](/packages/utils)
Utilities for BundleStats projects.
