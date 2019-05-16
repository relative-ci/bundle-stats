import { Logo } from '@relative-ci/ui/lib-esm/ui/logo';

import css from './header.module.css';

export const Header = () => (
  <div className={css.root}>
    <Logo
      className={css.webpackLogo}
      kind="webpack"
      as="a"
      href="https://webpack.js.org"
      target="_blank"
      rel="noopener noreferrer nofollow"
    />
    <h1 className={css.title}>
      Bundle Stats
    </h1>
    <Logo
      className={css.githubLogo}
      kind="github"
      as="a"
      href="https://github.com/relative-ci/webpack-bundle-stats"
      target="_blank"
      rel="noopener noreferrer nofollow"
    />
  </div>
);
