import commonConfig from './common';

export default {
  ...commonConfig,
  git: {
    ...commonConfig.git,
    commitMessage: 'DROP - release ${version}',
  },
};
