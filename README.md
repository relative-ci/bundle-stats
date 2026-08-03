# rollup-plugin-stats

[![](https://img.shields.io/npm/v/rollup-plugin-stats.svg)](https://www.npmjs.com/package/rollup-plugin-stats)
[![npm](https://img.shields.io/npm/dm/rollup-plugin-stats)](https://www.npmjs.com/package/rollup-plugin-stats)
![](https://img.shields.io/node/v/rollup-plugin-stats.svg)
[![Socket Badge](https://socket.dev/api/badge/npm/package/rollup-plugin-stats)](https://socket.dev/npm/package/rollup-plugin-stats)
[![ci](https://github.com/relative-ci/rollup-plugin-stats/actions/workflows/ci.yml/badge.svg)](https://github.com/relative-ci/rollup-plugin-stats/actions/workflows/ci.yml)

[![Vite compatibility](https://registry.vite.dev/api/badges?package=rollup-plugin-stats&tool=vite)](https://npmx.dev/package/rollup-plugin-stats)
[![Rolldown compatibility](https://registry.vite.dev/api/badges?package=rollup-plugin-stats&tool=rolldown)](https://npmx.dev/package/rollup-plugin-stats)
[![Rollup compatibility](https://registry.vite.dev/api/badges?package=rollup-plugin-stats&tool=rollup)](https://npmx.dev/package/rollup-plugin-stats)

Vite/Rolldown/Rollup plugin to generate bundle stats JSON file

## Install

```shell
npm install --dev rollup-plugin-stats
```

or

```shell
pnpm add --save-dev rollup-plugin-stats
```

or

```shell
yarn add --dev rollup-plugin-stats
```

## Configure

### Vite

```js
// vite.config.mjs
import { defineConfig } from 'vite';
import pluginStats from 'rollup-plugin-stats';

export default defineConfig({
  // your vite config
  plugins: [
    // add it as the last plugin
    pluginStats(),
  ],
});
```

### Rollup

```js
// rollup.config.mjs
import { defineConfig } from 'rollup';
import pluginStats from 'rollup-plugin-stats';

export default defineConfig({
  // your rollup config
  plugins: [
    // add it as the last plugin
    pluginStats(),
  ],
});
```

```js
// rollup.config.js
const { defineConfig } = require('rollup');
const pluginStats = require('rollup-plugin-stats');

module.exports = defineConfig({
  // your rollup config
  plugins: [
    // add it as the last plugin
    pluginStats(),
  ],
});
```

### Rolldown

```js
// rolldown.config.js
import { defineConfig } from 'rolldown';
import pluginStats from 'rollup-plugin-stats';

export default defineConfig({
  // your rolldown config
  plugins: [
    // add it as the last plugin
    pluginStats(),
  ],
});
```

### Options

- `fileName` - the JSON filepath relative to the build folder or absolute(default: `stats.json`)
- `write` - format and write the stats to disk(default: `fs.write(filename, JSON.stringify(stats, null, 2))`)
- `stats`
  - `source` - output asset/chunk/module source (default `false`)
  - `map` - output chunk map property (default: `false`)
  - `excludeAssets` - exclude matching assets: `string | RegExp | ((filepath: string) => boolean) | Array<string | RegExp | ((filepath: string) => boolean)>`
  - `excludeModules` - exclude matching modules: `string | RegExp | ((filepath: string) => boolean) | Array<string | RegExp | ((filepath: string) => boolean)>`

## Development setup

### Use the project node version

```shell
nvm use
```

### Install dependencies

```shell
npm install
```

### Prepare

```shell
npm run prepare
```

## Related projects

### [bundle-stats](https://github.com/relative-ci/bundle-stats)

Analyze bundle stats(bundle size, assets, modules, packages) and compare the results between different builds. Support for webpack, rspack, vite, rolldown and rollup.

### [rollup-plugin-webpack-stats](https://github.com/relative-ci/rollup-plugin-webpack-stats)

Generate vite/rollup/rolldown stats JSON file with a [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/cli) webpack [supported structure](https://github.com/relative-ci/bundle-stats/blob/master/packages/plugin-webpack-filter/src/index.ts).

### :cyclone: [relative-ci.com](https://relative-ci.com?utm_medium=rollup-plugin-stats)

#### Automated bundle analysis, reviews and monitoring - Quickly identify and fix bundle regressions before shipping to production.

- :crystal_ball: In-depth bundle stats analysis for every build
- :chart_with_upwards_trend: Monitor bundle stats changes and identify opportunities for optimizations
- :bell: Quick feedback with [rule based automated review flow](https://relative-ci.com/documentation/setup/configure/integrations/github-commit-status-review?utm_medium=rollup-plugin-stats), [GitHub Pull Request comments](https://relative-ci.com/documentation/setup/configure/integrations/github-pull-request-comment?utm_medium=rollup-plugin-stats), [GitHub check reports](https://relative-ci.com/documentation/setup/configure/integrations/github-check-report?utm_medium=rollup-plugin-stats), or [Slack messages](https://relative-ci.com/documentation/setup/configure/integrations/slack-notification?utm_medium=rollup-plugin-stats)
- :wrench: Support for **webpack**, **vite**, **rspack**, **rollup**, **rolldown**
- :hammer: Support for all major CI services(CircleCI, GitHub Actions, Gitlab CI, Jenkins, Travis CI)
- :nut_and_bolt: Support for **npm**, **yarn** and **pnpm**; support for monorepos
- :two_hearts: [**Always free** for **Open Source**](https://relative-ci.com/open-source?utm_medium=rollup-plugin-stats)

[:rocket: Get started](https://relative-ci.com?utm_medium=rollup-plugin-stats)
