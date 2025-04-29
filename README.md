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

## Related projects

### :cyclone: [relative-ci.com](https://relative-ci.com?utm_medium=bundle-stats)

#### Optimize your web app's performance with automated bundle stats analysis and monitoring.

- :crystal_ball: In-depth bundle stats analysis for every build
- :chart_with_upwards_trend: Monitor bundle stats changes and identify opportunities for optimizations
- :bell: [Rule based automated review flow](https://relative-ci.com/documentation/setup/configure/integrations/github-commit-status-review?utm_medium=bundle-stats), or get notified via [GitHub Pull Request comments](https://relative-ci.com/documentation/setup/configure/integrations/github-pull-request-comment?utm_medium=bundle-stats), [GitHub check reports](https://relative-ci.com/documentation/setup/configure/integrations/github-check-report?utm_medium=bundle-stats) and [Slack messages](https://relative-ci.com/documentation/setup/configure/integrations/slack-notification?utm_medium=bundle-stats)
- :wrench: Support for **webpack** and beta support for **Vite**/**Rollup**
- :hammer: Support for all major CI services(CircleCI, GitHub Actions, Gitlab CI, Jenkins, Travis CI)
- :nut_and_bolt: Support for **npm**, **yarn** and **pnpm**; support for monorepos
- :two_hearts: **Always free** for **Open Source**

[:rocket: Get started](https://relative-ci.com?utm_medium=bundle-stats)

### :first_quarter_moon: [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)

### :zap: [bundle-stats-action](https://github.com/vio/bundle-stats-action)

Github Action that generates [bundle-stats](https://github.com/relative-ci/bundle-stats) reports.

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
