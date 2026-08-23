import commonConfig from './common';

export default {
  ...commonConfig,
  git: {
    ...commonConfig.git,
    commitMessage: ':package: release ${version}',
  },
  github: {
    ...commonConfig.github,
    release: true,
  },
  plugins: {
    ...commonConfig.plugins,
    '@release-it/conventional-changelog': {
      preset: 'angular',
    },
  },
};
