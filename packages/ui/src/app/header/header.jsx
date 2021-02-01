import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Container } from '../../ui/container';
import { JobsHeader } from '../../components/jobs-header';
import { Logo } from '../../ui/logo';

import css from './header.module.css';

export const Header = ({ className, jobs }) => (
  <Container as="header" className={cx(css.root, className)}>
    <div className={css.inner}>
      <a
        className={css.branding}
        href="https://github.com/relative-ci/bundle-stats"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Logo className={css.brandingLogo}>BundleStats</Logo>
      </a>
      <JobsHeader className={css.jobs} jobs={jobs} />
    </div>
  </Container>
);

Header.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  className: '',
  jobs: null,
};
