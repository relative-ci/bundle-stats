<p align="center">
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank"><img alt="BundleStats screenshot" width="480" src="https://www.dropbox.com/s/8t6m6rruaauwlxq/bundle-stats-screenshot-4.jpg?raw=1"/></a>
</p>
<h1 align="center">Bundle Stats</h1>
<p align="center">
<strong>
  In-depth reporting for bundle changes (assets, chunks, modules).
</strong>
</p>
<p align="center">
  <a href="https://travis-ci.org/bundle-stats/bundle-stats"><img alt="TravisCI badge" src="https://api.travis-ci.org/bundle-stats/bundle-stats.svg?branch=master"/></a>
  <img alt="Renovate" src="https://badges.renovateapi.com/github/bundle-stats/bundle-stats?v=1" />
</p>

## Demo

- [Single job](https://relative-ci.com/tools/webpack-bundle-stats/demo-single-job.html)
- [Multiple jobs](https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html)


## How to use it

### 1. CLI

#### Install

```shell
# npm
npm install -g bundle-stats
# or yarn
yarn global add bundle-stats
```

#### Usage

```shell
$ bundle-stats __fixtures__/webpack-stats-0.json __fixtures__/webpack-stats-1.json
  ✔ Read Webpack stat files
  ✔ Gather data
  ✔ Generate reports
  ✔ Save reports

Reports saved:
- ./dist/report.html
```

[Read more about bundle-stats usage and Webpack configuration](packages/cli#readme)

### 2. Standalone web application

Use https://compare.relative-ci.com for comparing Webpack/Lighthouse/Browsertime stats:

[Read more](packages/web-compare#readme)

## Packages

### [`bundle-stats`](/packages/cli)

Generate bundle report based on Webpack stats data.

### [`@bundle-stats/web-compare`](packages/web-app)
Side by side comparison for webpack/lighthouse/browsertime stats - https://compare.relative-ci.com.

### [`@bundle-stats/html-templates`](/packages/webpack-report-html-template)
HTML templates for report generation.

### [`@bundle-stats/ui`](/packages/ui)
UI components for BundleStats projects.

### [`@bundle-stats/utils`](/packages/utils)
Utilities for BundleStats projects.
