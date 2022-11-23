<p align="center">
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank"><img alt="BundleStats screenshot" width="768" src="https://raw.githubusercontent.com/relative-ci/bundle-stats/master/bundle-stats.png"/></a>
</p>
<p align="center">
  <strong>Demo:</strong>
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank">Compare multiple builds</a>,
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-single-job.html" target="_blank">Single build</a>
</p>
<h1 align="center">BundleStats</h1>
<p align="center">
  Analyze webpack stats(bundle size, assets, modules, packages) and compare the results between different builds.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bundle-stats"><img src="https://img.shields.io/npm/v/bundle-stats.svg" /></a>
  <img src="https://img.shields.io/node/v/bundle-stats.svg" alt="Node version" />
  <a href="https://github.com/relative-ci/bundle-stats/actions/workflows/build.yaml"><img alt="GitHub action" src="https://github.com/relative-ci/bundle-stats/actions/workflows/build.yaml/badge.svg" /></a>
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

## Webpack configuration

The CLI is consuming the Webpack stats json. The following [stats options](https://webpack.js.org/configuration/stats) are required:

```js
{
  stats: {
    assets: true,
    chunks: true,
    modules: true,
    builtAt: true,
    hash: true
  }
}
```

You can output the stats json file using [webpack-cli](https://www.npmjs.com/package/webpack-cli):

```shell
npx webpack --mode production --json artifacts/webpack-stats.json
```

## Usage

```shell
$ bundle-stats -h
Usage: bundle-stats OPTIONS [WEBPACK_STATS_FILE]...

Options:
  --compare      Use local saved stats for comparison  [boolean] [default: true]
  --baseline     Save current stats as baseline       [boolean] [default: false]

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

#### In-depth webpack bundle analysis and monitoring

RelativeCI automates webpack bundle analysis, monitoring, and alerting so you can identify and fix bundle regressions before shipping to production:

- :crystal_ball: Analyze webpack bundle stats on every build
- :chart_with_upwards_trend: Monitor webpack bundle stats changes and identify tendencies over extended periods
- :bell: Get notified via GitHub Checks, GitHub Pull Request comments, and Slack notifications
- :hammer: Support for all major CI services (CircleCI, GitHub Actions, Gitlab CI, Jenkins, Travis CI)
- :two_hearts: Always free for Open Source

[Try for free](https://relative-ci.com?utm_medium=bundle-stats-cli)

### :first_quarter_moon: [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)

### :zap: [bundle-stats-action](https://github.com/vio/bundle-stats-action)

Github Action that generates [bundle-stats](https://github.com/relative-ci/bundle-stats) reports.
