<p align="center">
  <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html" target="_blank"><img alt="BundleStats screenshot" width="640" src="https://camo.githubusercontent.com/fbd1e95797391e0b0ed5d4926040ae01cc2e5476/68747470733a2f2f7777772e64726f70626f782e636f6d2f732f7679746875616d353567637a366e612f62756e646c652d73746174732d312e31342e6a70673f7261773d31"/></a>
</p>
<h1 align="center">BundleStats</h1>
<p align="center">
  Generate bundle report(bundle size, assets, modules, packages) and compare the results between different builds.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bundle-stats"><img src="https://img.shields.io/npm/v/bundle-stats.svg" /></a>
  <img src="https://img.shields.io/node/v/bundle-stats.svg" alt="Node version" />
  <a href="https://travis-ci.org/relative-ci/bundle-stats"><img alt="TravisCI badge" src="https://api.travis-ci.org/relative-ci/bundle-stats.svg?branch=master"/></a>
  <img alt="Renovate" src="https://badges.renovateapi.com/github/relative-ci/bundle-stats?v=1" />
  <a href="https://lgtm.com/projects/g/relative-ci/bundle-stats/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/relative-ci/bundle-stats.svg?logo=lgtm&logoWidth=18"/></a>
</p>
<p align="center">
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#totals"><strong>Bundle size</strong> and totals by file type(css, js, img, etc)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#totals"><strong>Cache invalidation</strong>, Initial JS/CSS and other bundle specific metrics</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#assets"><strong>Assets</strong> report (entrypoint, initial, types, changed, delta)</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#modules"><strong>Modules</strong> report (changed, delta) by chunk</a><br />
- <a href="https://relative-ci.com/tools/webpack-bundle-stats/demo-multiple-jobs.html#packages"><strong>Packages</strong> report (count, duplicate, changed, delta)</a><br />
:star: <strong>Side by side comparison</strong> for multiple jobs
</p>

## Related projects

### [relative-ci.com](https://relative-ci.com)

Continuous monitoring for webpack bundles:
- Monitor and analyze bundle size, assets, modules, packages
- Github Checks, Slack integration
- Support for all major CI services (Travis CI, Circle CI, Jenkins, Gitlab CI, Codeship, etc)
- Free for OpenSource

[Try Beta](https://relative-ci.com)

### [relative-ci/compare](https://compare.relative-ci.com)

Standalone web application to compare Webpack/Lighthouse/Browsertime stats.

[Compare bundle stats](https://compare.relative-ci.com)

## Packages

### [`bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/cli)

CLI to generate bundle stats report.

### [`bundle-stats-webpack-plugin`](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin)

Webpack plugin to generate bundle stats report.

### [`gatsby-plugin-bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/gatsby-plugin)

Gatsby plugin for BundleStats.

### [`next-plugin-bundle-stats`](https://github.com/relative-ci/bundle-stats/tree/master/packages/next-plugin)

Gatsby plugin for BundleStats.

#### [`@bundle-stats/html-templates`](https://github.com/relative-ci/bundle-stats/tree/master/packages/html-templates)
HTML templates for BundleStats reports.

#### [`@bundle-stats/ui`](https://github.com/relative-ci/bundle-stats/tree/master/packages/ui)
UI components for BundleStats projects.

#### [`@bundle-stats/utils`](https://github.com/relative-ci/bundle-stats/tree/master/packages/utils)
Utilities for BundleStats projects.

