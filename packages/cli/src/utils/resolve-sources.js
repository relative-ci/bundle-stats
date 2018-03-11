import fse from 'fs-extra';

const resolveSources = sources =>
  Promise.all(sources.map(source => fse.readJson(source)))
    .then(resSources => resSources.map(res => ({ res })));


export default resolveSources;
