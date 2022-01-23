import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { FlexStack } from '../../layout/flex-stack';
import { Container } from '../../ui/container';
import { JobsHeader } from '../../components/jobs-header';
import { Logo } from '../../ui/logo';

import css from './header.module.css';

export const Header = ({ className, jobs }) => (
  <Container as="header" className={cx(css.root, className)}>
    <FlexStack space="small" className={css.inner}>
      <JobsHeader className={css.jobs} jobs={jobs} />
      <div className={css.options}>
        <a
          href="https://github.com/relative-ci/bundle-stats"
          target="_blank"
          rel="noopener noreferrer nofollow"
          title="View bundle-stats on GitHub"
        >
          <Logo className={css.github} kind="github">
            GitHub
          </Logo>
        </a>
      </div>
    </FlexStack>
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
