import resolveSources from './utils/resolve-sources';
import browsertime from './reports/browsertime';
import lighthouse from './reports/lighthouse';

const resolveReport = (type) => {
  if (type === 'browsertime') {
    return browsertime;
  }

  if (type === 'lighthouse') {
    return lighthouse;
  }
}

export default (type, sources) => {
  const report = resolveReport(type);

  resolveSources(sources)
    .then(report)
    .then(console.log)
    .catch(console.error);
};
