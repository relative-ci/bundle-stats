<p align="center">
  <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis-comparison" target="_blank"><img alt="BundleStats screenshot" src="https://raw.githubusercontent.com/relative-ci/bundle-stats/master/bundle-stats.gif"/></a>
</p>
<p align="center">
  Demos:
  <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis-comparison" target="_blank">Bundle analysis comparison</a> ·
  <a href="https://relative-ci.com/bundle-analyzer/bundle-stats/demo/bundle-analysis" target="_blank">Bundle analysis</a>
</p>
<h1 align="center">BundleStats</h1>
<p align="center">
  Analyze bundle stats(bundle size, assets, modules, packages) and compare the results between different builds. Support for webpack, rspack, vite, rollup and rolldown.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bundle-stats"><img src="https://img.shields.io/npm/v/bundle-stats.svg" /></a>
  <a href="https://www.npmjs.com/package/bundle-stats"><img src="https://img.shields.io/npm/dm/bundle-stats.svg" /></a>
  <img src="https://img.shields.io/node/v/bundle-stats.svg" alt="Node version" />
  <a href="https://github.com/relative-ci/bundle-stats/actions/workflows/ci.yml"><img alt="GitHub action" src="https://github.com/relative-ci/bundle-stats/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://socket.dev/npm/package/bundle-stats/overview"><img alt="Socket" src="https://socket.dev/api/badge/npm/package/bundle-stats" /></a>
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
- [Install as global dependency](#install-as-global-dependency)
- [Install as dev dependency](#install-as-dev-dependency)
- [Webpack configuration](#webpack-configuration)
- [Usage](#usage)
- [Compare mode](#compare-mode-1)
- [Framework specific plugins](#framework-specific-plugins)
- [Related projects](#related-projects)

## Install as global dependency

```shell
npm install -g bundle-stats
```

or

```shell
yarn global add bundle-stats
```

## Install as dev dependency

```shell
npm install --dev bundle-stats
```

or

```shell
yarn add --dev bundle-stats
```

## Output webpack stats

The CLI is consuming the Webpack stats JSON file. The following [webpack stats options](https://webpack.js.org/configuration/stats) are needed:

```js
{
  stats: {
    // required
    assets: true,
    chunks: true,
    modules: true,
    // optional
    builtAt: true,
    hash: true
  }
}
```

[How to configure webpack for better debugging and monitoring](https://relative-ci.com/documentation/guides/webpack-config)

You can output the webpack stats JSON file using [webpack-cli](https://www.npmjs.com/package/webpack-cli) `--json` option:

```shell
npx webpack --mode production --json artifacts/webpack-stats.json
```

- [How to output webpack stats JSON file using webpack-cli](https://relative-ci.com/documentation/guides/webpack-stats/webpack-cli)
- [How to output webpack stats JSON file using webpack-stats-plugin](https://relative-ci.com/documentation/guides/webpack-stats/webpack-stats-plugin)

## Usage

```shell
$ bundle-stats -h
Usage: bundle-stats OPTIONS [WEBPACK_STATS_FILE]...

Options:
      --demo               Generate demo reports      [boolean] [default: false]
      --compare            Use local saved stats for comparison
                                                       [boolean] [default: true]
      --baseline           Save current stats as baseline
                                                      [boolean] [default: false]
      --baseline-filepath  Baseline filepath, default:
                           node_modules/.cache/bundle-stats/baseline.json
                                                                        [string]
      --html               Save HTML report            [boolean] [default: true]
      --json               Save JSON data             [boolean] [default: false]
  -d, --out-dir            Output directory                             [string]
  -h, --help               Show help                                   [boolean]
  -v, --version            Show version number                         [boolean]
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

┌─────────────────────────────────────────────────┐
│                                                 │
│   Bundle size decreased with 3.06KB (-0.38%).   │
│                                                 │
└─────────────────────────────────────────────────┘

Artifacts saved:
- ./dist/bundle-stats.html
- ./dist/bundle-stats.json
```

## Compare mode

In `compare` mode, the metrics are compared against an existing(`node_modules/.cache/bundle-stats/baseline.json`) Webpack stats file(baseline). To generate the baseline webpack stats, use `--baseline` option:

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

┌─────────────────────────────────────────────────┐
│                                                 │
│   Bundle size decreased with 3.06KB (-0.38%).   │
│                                                 │
└─────────────────────────────────────────────────┘

Artifacts saved:
- ./dist/bundle-stats.html
```

```shell
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

┌─────────────────────────────────────────────────┐
│                                                 │
│   Bundle size decreased with 3.06KB (-0.38%).   │
│                                                 │
└─────────────────────────────────────────────────┘

Artifacts saved:
- ./dist/bundle-stats.html
```

The option can be disabled using `--no-compare` option.

## Framework specific plugins

- [Webpack](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin)
- [Gatsby](https://github.com/relative-ci/bundle-stats/tree/master/packages/gatsby-plugin)
- [Next](https://github.com/relative-ci/bundle-stats/tree/master/packages/next-plugin)

## Related projects

### :cyclone: [relative-ci.com](https://relative-ci.com?utm_medium=bundle-stats-cli)

#### Automated bundle analysis, reviews and monitoring - Quickly identify and fix bundle regressions before shipping to production.

- :crystal_ball: In-depth bundle stats analysis for every build
- :chart_with_upwards_trend: Monitor bundle stats changes and identify opportunities for optimizations
- :bell: Quick feedback with [rule based automated review flow](https://relative-ci.com/documentation/setup/configure/integrations/github-commit-status-review?utm_medium=bundle-stats-cli), [GitHub Pull Request comments](https://relative-ci.com/documentation/setup/configure/integrations/github-pull-request-comment?utm_medium=bundle-stats-cli), [GitHub check reports](https://relative-ci.com/documentation/setup/configure/integrations/github-check-report?utm_medium=bundle-stats-cli), or [Slack messages](https://relative-ci.com/documentation/setup/configure/integrations/slack-notification?utm_medium=bundle-stats-cli)
- :wrench: Support for **webpack**, **vite**, **rspack**, **rollup**, **rolldown**
- :hammer: Support for all major CI services(CircleCI, GitHub Actions, Gitlab CI, Jenkins, Travis CI)
- :nut_and_bolt: Support for **npm**, **yarn** and **pnpm**; support for monorepos
- :two_hearts: [**Always free** for **Open Source**](https://relative-ci.com/open-source?utm_medium=bundle-stats-cli)

[:rocket: Get started](https://relative-ci.com?utm_medium=bundle-stats-cli)

### :first_quarter_moon: [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)

### :zap: [bundle-stats-action](https://github.com/vio/bundle-stats-action)

Github Action that generates [bundle-stats](https://github.com/relative-ci/bundle-stats) reports.


## Other packages

### [`bundle-stats-webpack-plugin`](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin)

[![npm](https://img.shields.io/npm/v/bundle-stats-webpack-plugin)](https://www.npmjs.com/package/bundle-stats-webpack-plugin) [![npm](https://img.shields.io/npm/dm/bundle-stats-webpack-plugin)](https://www.npmjs.com/package/bundle-stats-webpack-plugin)

Webpack plugin to generate bundle stats report for webpack/rspack.

### [`gatsby-plugin-bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/gatsby-plugin)

[![npm](https://img.shields.io/npm/v/gatsby-plugin-bundle-stats)](https://www.npmjs.com/package/gatsby-plugin-bundle-stats) [![npm](https://img.shields.io/npm/dm/gatsby-plugin-bundle-stats)](https://www.npmjs.com/package/gatsby-plugin-bundle-stats)

[Gatsby](https://www.gatsbyjs.org) plugin for [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin).

### [`next-plugin-bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/next-plugin)

[![npm](https://img.shields.io/npm/v/next-plugin-bundle-stats)](https://www.npmjs.com/package/next-plugin-bundle-stats) [![npm](https://img.shields.io/npm/dm/next-plugin-bundle-stats)](https://www.npmjs.com/package/next-plugin-bundle-stats)

[Next.js](https://nextjs.org) plugin for [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin).

### [`rollup-plugin-bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/rollup-plugin)

[![npm](https://img.shields.io/npm/v/rollup-plugin-bundle-stats)](https://www.npmjs.com/package/rollup-plugin-bundle-stats) [![npm](https://img.shields.io/npm/dm/rollup-plugin-bundle-stats)](https://www.npmjs.com/package/rollup-plugin-bundle-stats)

Rollup plugin to generate bundle stats report for vite/rolldown/rollup.
