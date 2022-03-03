import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Container } from '../../ui/container';
import { JobsHeader } from '../../components/jobs-header';
import css from './header.module.css';

export const Header = ({ className, jobs }) => (
  <Container as="header" className={cx(css.root, className)}>
    <div className={css.inner}>
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
