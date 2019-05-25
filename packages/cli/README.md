<p align="center">
  <img alt="BundleStats screenshot" width="480" src="https://www.dropbox.com/s/8t6m6rruaauwlxq/bundle-stats-screenshot-4.jpg?raw=1"/>
</p>
<h1 align="center">Bundle Stats</h1>
<p align="center">
<strong>
  In-depth reports for bundle changes (assets, chunks, modules).
</strong>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bundle-stats"><img src="https://img.shields.io/npm/v/bundle-stats.svg" /></a>
  <a href="https://travis-ci.org/bundle-stats/bundle-stats"><img alt="TravisCI badge" src="https://api.travis-ci.org/bundle-stats/bundle-stats.svg?branch=master"/></a>
  <img alt="Renovate" src="https://badges.renovateapi.com/github/bundle-stats/bundle-stats?v=1" />
</p>

## Demo

- [Single job](https://relative-ci.com/tools/webpack-bundle-stats/demo-single-job.html)
- [Multiple jobs](https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html)

## Install

```shell
npm install -g bundle-stats
```

or

```shell
yarn global add bundle-stats
```

## Configuration

Configure Webpack stats to output the necessary data:

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

## Usage

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
