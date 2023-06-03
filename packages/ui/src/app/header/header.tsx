import React from 'react';
import cx from 'classnames';

import config from '../../config.json';
import { Container } from '../../ui/container';
import { FlexStack } from '../../layout/flex-stack';
import { JobsHeader } from '../../components/jobs-header';
import css from './header.module.css';
import { Icon } from '../../ui';

interface HeaderProps {
  jobs: React.ComponentProps<typeof JobsHeader>['jobs'];
}

export const Header = ({ className = '', jobs }: HeaderProps & React.ComponentProps<'header'>) => (
  <Container as="header" className={cx(css.root, className)}>
    <FlexStack space="small" alignItems="center">
      <JobsHeader className={css.jobs} jobs={jobs} />
      <div className={css.tools}>
        <a href={config.gitHubUrl} target="_blank" rel="noopener noreferrer" className={css.toolsGitHub}>
          <Icon glyph={Icon.ICONS.GITHUB} size="large" className={css.toolsGitHubIcon} />
        </a>
      </div>
    </FlexStack>
  </Container>
);
