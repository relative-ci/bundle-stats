# @bundle-stats/utils

[![](https://img.shields.io/npm/v/@bundle-stats/utils)](https://www.npmjs.com/package/@bundle-stats/utils)

Common utilities for [bundle-stats](https://github.com/relative-ci/bundle-stats) packages.

## How to generate a weback report

```js
import { createJobs, createReport } from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib/webpack';

// Get webpack stats data
const WEBPACK_STATS_CURRENT = {/* ... */};
const WEBPACK_STATS_BASELINE = {/* ... */};

// Create jobs
const jobs = createJobs([
  { webpack: WEBPACK_STATS_CURRENT },
  { webpack: WEBPACK_STATS_BASELINE }
]);

// Create report
const report = createReport(jobs);

console.log(report.insights.webpack.assetsSizeTotal.data.text);
>> Bundle size increased to 9.77KB (+100%).
```

## Packages

- [CLI](https://github.com/relative-ci/bundle-stats/tree/master/packages/cli)
- [Webpack](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin)
- [Gatsby](https://github.com/relative-ci/bundle-stats/tree/master/packages/gatsby-plugin)
- [Next](https://github.com/relative-ci/bundle-stats/tree/master/packages/next-plugin)

## Packages

### [`bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/cli)

[![npm](https://img.shields.io/npm/v/bundle-stats)](https://www.npmjs.com/package/bundle-stats) [![npm](https://img.shields.io/npm/dm/bundle-stats)](https://www.npmjs.com/package/bundle-stats)

CLI to generate bundle stats report.

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

## Related projects

### :cyclone: [relative-ci.com](https://relative-ci.com?utm_medium=bundle-stats-utils)

#### Automated bundle analysis, reviews and monitoring - Quickly identify and fix bundle regressions before shipping to production.

- :crystal_ball: In-depth bundle stats analysis for every build
- :chart_with_upwards_trend: Monitor bundle stats changes and identify opportunities for optimizations
- :bell: Quick feedback with [rule based automated review flow](https://relative-ci.com/documentation/setup/configure/integrations/github-commit-status-review?utm_medium=bundle-stats-utils), [GitHub Pull Request comments](https://relative-ci.com/documentation/setup/configure/integrations/github-pull-request-comment?utm_medium=bundle-stats-utils), [GitHub check reports](https://relative-ci.com/documentation/setup/configure/integrations/github-check-report?utm_medium=bundle-stats-utils), or [Slack messages](https://relative-ci.com/documentation/setup/configure/integrations/slack-notification?utm_medium=bundle-stats-utils)
- :wrench: Support for **webpack**, **vite**, **rspack**, **rollup**, **rolldown**
- :hammer: Support for all major CI services(CircleCI, GitHub Actions, Gitlab CI, Jenkins, Travis CI)
- :nut_and_bolt: Support for **npm**, **yarn** and **pnpm**; support for monorepos
- :two_hearts: [**Always free** for **Open Source**](https://relative-ci.com/open-source?utm_medium=bundle-stats-utils)

[:rocket: Get started](https://relative-ci.com?utm_medium=bundle-stats-utils)

### :first_quarter_moon: [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)

### :zap: [bundle-stats-action](https://github.com/vio/bundle-stats-action)

Github Action that generates [bundle-stats](https://github.com/relative-ci/bundle-stats) reports.
