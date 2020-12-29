import React from 'react';
import cx from 'classnames';
import { JobsHeader } from '@bundle-stats/ui/lib-esm/components/jobs-header';
import { Logo } from '@bundle-stats/ui/lib-esm/ui/logo';

import css from './header.module.css';

export const Header = ({ className, jobs }) => (
  <header className={cx(css.root, className)}>
    <a className={css.branding} href="https://github.com/relative-ci/bundle-stats">
      <Logo className={css.brandingLogo}>BundleStats</Logo>
    </a>
    <JobsHeader className={css.jobs} jobs={jobs} />
    <div className={css.tools}>
      <Logo
        className={css.toolsGithub}
        kind="github"
        as="a"
        href="https://github.com/relative-ci/bundle-stats"
        target="_blank"
        rel="noopener noreferrer nofollow"
      />
    </div>
  </header>
);
