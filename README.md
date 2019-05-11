# Webpack Bundle Stats

Generate bundle report from the webpack stats data.

[https://img.shields.io/npm/v/@relative-ci/webpack-bundle-stats.svg](https://www.npmjs.com/package/@relative-ci/webpack-bundle-stats)
[![Greenkeeper badge](https://badges.greenkeeper.io/relative-ci/webpack-bundle-stats.svg)](https://greenkeeper.io/)

### Install

```shell
npm install -g @relative-ci/webpack-bundle-stats
```

or

```shell
yarn global add @relative-ci/webpack-bundle-stats
```

### Usage

```shell
$ webpack-bundle-stats -h
Usage: webpack-bundle-stats [STATS_FILE]...

Options:
  -h, --help     Show help                        [boolean]
  -v, --version  Show version number              [boolean]
```

```shell
webpack-bundle-stats artifacts/webpack-stats.json artifacts/webpack-stats-previous.js
```

