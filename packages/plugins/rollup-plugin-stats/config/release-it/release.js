import commonConfig from './common';

export default {
  ...commonConfig,
  git: {
    ...commonConfig.git,
    commit: false,
    push: false,
    tag: false,
    requireCleanWorkingDir: false,
    requireUpstream: false,
  },
  npm: {
    ...commonConfig.npm,
    publish: true,
  },
};
