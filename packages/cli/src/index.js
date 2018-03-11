import resolveSources from './utils/resolve-sources';
import browsertime from './reports/browsertime';
import lighthouse from './reports/lighthouse';
import webpackAssets from './reports/webpack-assets';
import webpackTotals from './reports/webpack-totals';

const resolveReport = (type) => {
  if (type === 'webpack.totals') {
    return webpackTotals;
  }

  if (type === 'webpack.assets') {
    return webpackAssets;
  }

  if (type === 'browsertime') {
    return browsertime;
  }

  if (type === 'lighthouse') {
    return lighthouse;
  }
}

export default (type, sources, options) => {
  const report = resolveReport(type);

  resolveSources(sources)
    .then(report(options))
    .then(console.log)
    .catch(console.error);
};
