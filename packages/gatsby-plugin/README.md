# gatsby-plugin-bundle-stats

[Gatsby](https://www.gatsbyjs.org) plugin for [bundle-stats](../bundle-stats).

## Description

In-depth bundle analyzer for webpack(bundle size, assets, modules)

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
