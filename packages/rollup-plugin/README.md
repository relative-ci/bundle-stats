# rollup-plugin-bundle-stats

<p align="center">
  <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis-comparison" target="_blank"><img alt="BundleStats screenshot" src="https://raw.githubusercontent.com/relative-ci/bundle-stats/master/bundle-stats.gif"/></a>
</p>
<p align="center">
  Demos:
  <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis-comparison" target="_blank">Bundle analysis comparison</a> ·
  <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis" target="_blank">Bundle analysis</a>
</p>
<h1 align="center">BundleStats rollup plugin</h1>
<p align="center">
  Analyze rollup/rolldown stats(bundle size, assets, modules, packages) and compare the results between different builds.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/rollup-plugin-bundle-stats"><img src="https://img.shields.io/npm/v/rollup-plugin-bundle-stats.svg" /></a>
  <a href="https://www.npmjs.com/package/rollup-plugin-bundle-stats"><img src="https://img.shields.io/npm/dm/rollup-plugin-bundle-stats.svg" /></a>
  <img src="https://img.shields.io/node/v/rollup-plugin-bundle-stats.svg" alt="Node version" />
  <a href="https://github.com/relative-ci/bundle-stats/actions/workflows/ci.yml"><img alt="GitHub action" src="https://github.com/relative-ci/bundle-stats/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://socket.dev/npm/package/rollup-plugin-bundle-stats/overview"><img alt="Socket" src="https://socket.dev/api/badge/npm/package/rollup-plugin-bundle-stats" /></a>
  <a href="https://github.com/relative-ci/bundle-stats/actions/workflows/codeql.yml"><img alt="CodeQL" src="https://github.com/relative-ci/bundle-stats/actions/workflows/codeql.yml/badge.svg"/></a>
</p>
<p align="center">
  <a href="https://app.relative-ci.com/projects/V1bXuieJbYttHCS75L8G"><img src="https://badges.relative-ci.com/badges/V1bXuieJbYttHCS75L8G?branch=master" alt="RelativeCI"></a>
</p>
<p align="center">
- <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis-comparison#/"><strong>Bundle size</strong> and <strong>totals by file</strong> type(css, js, img, etc)</a><br />
- <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis-comparison#/">Insights: <strong>duplicate packages</strong>, <strong>new packages</strong></a><br />
- <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis-comparison#/"><strong>Initial JS/CSS</strong>, <strong>Cache invalidation</strong>, and other bundle metrics</a><br />
- <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis-comparison#/assets"><strong>Assets</strong> report (entrypoint, initial, types, changed, delta)</a><br />
- <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis-comparison#/modules"><strong>Modules</strong> report (changed, delta, chunks, duplicate count and percentage)</a><br />
- <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis-comparison#/packages"><strong>Packages</strong> report (count, duplicate, changed, delta)</a><br />
:star: <strong>Side by side comparison</strong> for multiple builds
</p>

## Table of Contents
- [Install](#install)
- [Configure](#configure)
- [Compare mode](#compare-mode)
- [Other packages](#other-packages)
- [Related projects](#related-projects)

## Install

```shell
npm install --dev rollup-plugin-bundle-stats
```

or

```shell
yarn add --dev rollup-plugin-bundle-stats
```

## Configure

### Vite
```js
// vite.config.js
const { bundleStats } = require('rollup-plugin-bundle-stats');

module.exports = {
  ...,
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  plugins: [
    bundleStats()
  ]
};
```

### Rollup
```js
// rollup.config.js
const { bundleStats } = require('rollup-plugin-bundle-stats');

module.exports = {
  ...,
  output: {
    assetFileNames: 'assets/[name].[hash][extname]',
    chunkFileNames: 'assets/[name].[hash].js',
    entryFileNames: 'assets/[name].[hash].js',
  },
  plugins: [
    bundleStats()
  ]
};
```

### Rolldown

```js
// rolldown.config.js
import { defineConfig } from 'rolldown';
import { bundleStats } from 'rollup-plugin-bundle-stats';

export default defineConfig({
  ...,
  output: {
    assetFileNames: 'assets/[name].[hash][extname]',
    chunkFileNames: 'assets/[name].[hash].js',
    entryFileNames: 'assets/[name].[hash].js',
  },
  plugins: [
    bundleStats()
  ]
});
```


[How to configure Vite for better debugging and monitoring](https://relative-ci.com/documentation/guides/vite-config)

### Options

- `compare` - use local saved stats for comparison (default `true`).
- `baseline` - save current webpack stats as baseline (default `false`).
- `baselineFilepath` - baseline absolute filepath or relative filepath to `output.dir` (default 'node_modules/.cache/bundle-stats/baseline.json')
- `html` - output html report (default `true`).
- `json` - output json report (default `false`).
- `outDir` - output directory inside rollup output director `output.dir` (default `''`).
- `silent` - stop logging info and only log warning and error (default `false`).

## Compare mode

In `compare` mode, the metrics are compared against an existing(`node_modules/.cache/bundle-stats/baseline.json`) rollup stats file(baseline). To generate the baseline webpack stats, set `BUNDLE_STATS_BASELINE` environmental variable to `true` or set the plugin `baseline` option to `true`:

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

The option can be disabled by setting the plugin `compare` option to `false`.

## Other packages

### [`bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/cli)

[![npm](https://img.shields.io/npm/v/bundle-stats)](https://www.npmjs.com/package/bundle-stats) [![npm](https://img.shields.io/npm/dm/bundle-stats)](https://www.npmjs.com/package/bundle-stats)

CLI to generate bundle stats report.

### [`bundle-stats-webpack-plugin`](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin)

[![npm](https://img.shields.io/npm/v/bundle-stats-webpack-plugin)](https://www.npmjs.com/package/bundle-stats-webpack-plugin) [![npm](https://img.shields.io/npm/dm/bundle-stats-webpack-plugin)](https://www.npmjs.com/package/bundle-stats-webpack-plugin)

Webpack plugin to generate bundle stats report.

### [`gatsby-plugin-bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/gatsby-plugin)

[![npm](https://img.shields.io/npm/v/gatsby-plugin-bundle-stats)](https://www.npmjs.com/package/gatsby-plugin-bundle-stats) [![npm](https://img.shields.io/npm/dm/gatsby-plugin-bundle-stats)](https://www.npmjs.com/package/gatsby-plugin-bundle-stats)

[Gatsby](https://www.gatsbyjs.org) plugin for [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin).

### [`next-plugin-bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/next-plugin)

[![npm](https://img.shields.io/npm/v/next-plugin-bundle-stats)](https://www.npmjs.com/package/next-plugin-bundle-stats) [![npm](https://img.shields.io/npm/dm/next-plugin-bundle-stats)](https://www.npmjs.com/package/next-plugin-bundle-stats)

[Next.js](https://nextjs.org) plugin for [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin).

## Related projects

### :cyclone: [relative-ci.com](https://relative-ci.com?utm_medium=rollup-plugin-bundle-stats)

#### Optimize your web app's performance with automated bundle stats analysis and monitoring.

- :crystal_ball: In-depth bundle stats analysis for every build
- :chart_with_upwards_trend: Monitor bundle stats changes and identify opportunities for optimizations
- :bell: [Rule based automated review flow](https://relative-ci.com/documentation/setup/configure/integrations/github-commit-status-review?utm_medium=rollup-plugin-bundle-stats), or get notified via [GitHub Pull Request comments](https://relative-ci.com/documentation/setup/configure/integrations/github-pull-request-comment?utm_medium=rollup-plugin-bundle-stats), [GitHub check reports](https://relative-ci.com/documentation/setup/configure/integrations/github-check-report?utm_medium=rollup-plugin-bundle-stats) and [Slack messages](https://relative-ci.com/documentation/setup/configure/integrations/slack-notification?utm_medium=rollup-plugin-bundle-stats)
- :wrench: Support for **webpack** and beta support for **Vite**/**Rollup**
- :hammer: Support for all major CI services(CircleCI, GitHub Actions, Gitlab CI, Jenkins, Travis CI)
- :nut_and_bolt: Support for **npm**, **yarn** and **pnpm**; support for monorepos
- :two_hearts: **Always free** for **Open Source**

[:rocket: Get started](https://relative-ci.com?utm_medium=rollup-plugin-bundle-stats)

### :first_quarter_moon: [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)

### :zap: [bundle-stats-action](https://github.com/vio/bundle-stats-action)

Github Action that generates [bundle-stats](https://github.com/relative-ci/bundle-stats) reports.

