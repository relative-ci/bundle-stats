# Webpack Bundle Stats

[![webpack-bundle-stats version](https://img.shields.io/npm/v/@relative-ci/webpack-bundle-stats.svg)](https://www.npmjs.com/package/@relative-ci/webpack-bundle-stats)
[![TravisCI badge](https://api.travis-ci.org/relative-ci/webpack-bundle-stats.svg?branch=master)](https://travis-ci.org/relative-ci/webpack-bundle-stats)
[![Greenkeeper badge](https://badges.greenkeeper.io/relative-ci/webpack-bundle-stats.svg)](https://greenkeeper.io/)

Generate bundle report from the webpack stats data.

[Demo - one job](https://relative-ci.com/tools/webpack-bundle-stats/demo-single-job.html) | [Demo - multiple jobs](https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html)

![screenshot](https://www.dropbox.com/s/md4ttdf51lh7kt1/webpack-bundle-stats-screenshot.v4.jpg?raw=1)

### Install

```shell
npm install -g @relative-ci/webpack-bundle-stats
```

or

```shell
yarn global add @relative-ci/webpack-bundle-stats
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
$ webpack-bundle-stats -h
Usage: webpack-bundle-stats [STATS_FILE]...

Options:
  -h, --help     Show help                        [boolean]
  -v, --version  Show version number              [boolean]
```

```shell
$ webpack-bundle-stats artifacts/webpack-stats.json artifacts/webpack-stats-previous.js
> webpack-bundle-stats.html was created.
```
