export default {
  git: {
    commit: true,
    commitMessage: ':package: release ${version}\n[ci skip]',
    push: true,
    requireUpstream: false,
    tag: true,
    tagName: 'v${version}',
  },
  npm: {
    publish: false,
    ignoreVersion: true,
    allowSameVersion: true,
    skipChecks: true,
  },
  github: {
    draft: false,
    release: false,
    preRelease: false,
    tokenRef: 'GITHUB_TOKEN',
  },
};
