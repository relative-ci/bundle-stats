import React from 'react';
import cx from 'classnames';

import config from '../../config.json';
import I18N from '../../i18n';
import { Container } from '../../ui/container';
import { Icon } from '../../ui/icon';
import { FlexStack } from '../../layout/flex-stack';
import { JobsHeader } from '../../components/jobs-header';
import css from './header.module.css';

interface HeaderProps {
  jobs: React.ComponentProps<typeof JobsHeader>['jobs'];
}

export const Header = ({ className = '', jobs }: HeaderProps & React.ComponentProps<'header'>) => (
  <Container as="header" className={cx(css.root, className)}>
    <FlexStack space="small" alignItems="center">
      <JobsHeader className={css.jobs} jobs={jobs} />
      <div className={css.tools}>
        <a
          href={config.gitHubUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={I18N.GITHUB_LINK_TITLE}
          aria-label={I18N.GITHUB_LINK_TITLE}
          className={css.toolsGitHub}
        >
          <Icon glyph={Icon.ICONS.GITHUB} size="large" className={css.toolsGitHubIcon} />
        </a>
      </div>
    </FlexStack>
  </Container>
);
