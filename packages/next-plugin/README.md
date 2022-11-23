<p align="center">
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank"><img alt="BundleStats screenshot" width="768" src="https://raw.githubusercontent.com/relative-ci/bundle-stats/master/bundle-stats.png"/></a>
</p>

<p align="center">
  <strong>Demo:</strong>
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank">Compare multiple builds</a>,
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-single-job.html" target="_blank">Single build</a>
</p>

<h1 align="center">BundleStats Next.js plugin</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/next-plugin-bundle-stats"><img src="https://img.shields.io/npm/v/next-plugin-bundle-stats.svg" /></a>
  <img src="https://img.shields.io/node/v/next-plugin-bundle-stats.svg" alt="Node version" />
  <a href="https://github.com/relative-ci/bundle-stats/actions/workflows/build.yaml"><img alt="GitHub action" src="https://github.com/relative-ci/bundle-stats/actions/workflows/build.yaml/badge.svg" /></a>
  <a href="https://github.com/relative-ci/bundle-stats/actions/workflows/codeql.yml"><img alt="CodeQL" src="https://github.com/relative-ci/bundle-stats/actions/workflows/codeql.yml/badge.svg"/></a>
</p>
<p align="center">
  <a href="https://app.relative-ci.com/projects/V1bXuieJbYttHCS75L8G"><img src="https://badges.relative-ci.com/badges/V1bXuieJbYttHCS75L8G?branch=master" alt="RelativeCI"></a>
</p>
<p align="center">
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/"><strong>Bundle size</strong> and totals by file type(css, js, img, etc)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/"><strong>Cache invalidation</strong>, Initial JS/CSS and other bundle specific metrics</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/assets"><strong>Assets</strong> report (entrypoint, initial, types, changed, delta)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/modules"><strong>Modules</strong> report (changed, delta, chunks, duplicate count and percentage)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#/packages"><strong>Packages</strong> report (count, duplicate, changed, delta)</a><br />
:star: <strong>Side by side comparison</strong> for multiple builds
</p>

## Description

Analyze webpack stats(bundle size, assets, modules, packages) and compare the results between different builds.

## How to install

```shell
npm install --dev next-plugin-bundle-stats
```

or

```shell
yarn add --dev next-plugin-bundle-stats
```

## Available options

See [bundle-stats-webpack-plugin options](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin#bundlestatswebpackpluginoptions).

## Examples of usage

```js
// In your next.config.js
const withBundleStats = require('next-plugin-bundle-stats');

module.exports = withBundleStats();
```

or with custom options:
```js
// In your next.config.js
const withBundleStats = require('next-plugin-bundle-stats');

module.exports = withBundleStats({
  outDir: '../artifacts'
});
```

## Related projects

### :cyclone: [relative-ci.com](https://relative-ci.com?utm_medium=bundle-stats-next-plugin)

#### In-depth webpack bundle analysis and monitoring

RelativeCI automates webpack bundle analysis, monitoring, and alerting so you can identify and fix bundle regressions before shipping to production:

- :crystal_ball: Analyze webpack bundle stats on every build
- :chart_with_upwards_trend: Monitor webpack bundle stats changes and identify tendencies over extended periods
- :bell: Get notified via GitHub Checks, GitHub Pull Request comments, and Slack notifications
- :hammer: Support for all major CI services (CircleCI, GitHub Actions, Gitlab CI, Jenkins, Travis CI)
- :two_hearts: Always free for Open Source

[Try for free](https://relative-ci.com?utm_medium=bundle-stats-next-plugin)

### :first_quarter_moon: [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)

### :zap: [bundle-stats-action](https://github.com/vio/bundle-stats-action)

Github Action that generates [bundle-stats](https://github.com/relative-ci/bundle-stats) reports.
