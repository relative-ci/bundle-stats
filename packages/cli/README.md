# Webpack Bundle Stats

[![bundle-stats version](https://img.shields.io/npm/v/bundle-stats.svg)](https://www.npmjs.com/package/bundle-stats)
[![TravisCI badge](https://api.travis-ci.org/bundle-stats/bundle-stats.svg?branch=master)](https://travis-ci.org/bundle-stats/bundle-stats)

CLI to generate reports based on Webpack stats data.

[Demo - one job](https://relative-ci.com/tools/webpack-bundle-stats/demo-single-job.html) | [Demo - multiple jobs](https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html)

![screenshot](https://www.dropbox.com/s/m6tsdn3dca3b295/webpack-bundle-stats-screenshot.v5.jpg?raw=1)

### Install

```shell
npm install -g bundle-stats
```

or

```shell
yarn global add bundle-stats
```

### Configuration

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

[More info](https://relative-ci.com/documentation/setup#1-configure-webpack)

### Usage

```shell
$ bundle-stats -h
Usage: webpack-bundle-stats OPTIONS [STATS_FILE]...

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
