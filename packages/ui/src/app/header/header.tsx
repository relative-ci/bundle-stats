import React from 'react';
import cx from 'classnames';

import { Container } from '../../ui/container';
import { JobsHeader } from '../../components/jobs-header';
import css from './header.module.css';

interface HeaderProps {
  jobs: React.ComponentProps<typeof JobsHeader>['jobs'];
}

export const Header = ({ className = '', jobs }: HeaderProps & React.ComponentProps<'header'>) => (
  <Container as="header" className={cx(css.root, className)}>
    <JobsHeader className={css.jobs} jobs={jobs} />
  </Container>
);
