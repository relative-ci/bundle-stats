# gatsby-plugin-bundle-stats

[![](https://img.shields.io/npm/v/gatsby-plugin-bundle-stats.svg)](https://www.npmjs.com/package/gatsby-plugin-bundle-stats)

[Gatsby](https://www.gatsbyjs.org) plugin for [bundle-stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/webpack-plugin).

## Description

Generate bundle report(bundle size, assets, modules) and compare the results between different builds.

## How to install

```shell
npm install --dev gatsby-plugin-bundle-stats
```

or

```shell
yarn add --dev gatsby-plugin-bundle-stats
```

## Available options

See [bundle-stats available options](../bundle-stats/#bundlestatswebpackpluginoptions).

## Examples of usage

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    'gatsby-plugin-bundle-stats'
  ]
};
```

or with custom options

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-bundle-stats',
      options: {
        compare: true,
        outDir: '../artifacts',
        stats: {
          context: './src'
        }
      }
    },
  ]
};
```

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
