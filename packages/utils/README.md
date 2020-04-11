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

### [bundle-stats-action](https://github.com/vio/bundle-stats-action)

Github Action that generates [bundle-stats](https://github.com/relative-ci/bundle-stats) reports for webpack.
