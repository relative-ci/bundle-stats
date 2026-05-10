import React from 'react';
import cx from 'classnames';

import config from '../../config.json';
import I18N from '../../i18n';
import { useTheme } from '../../context/theme';
import { Container } from '../../ui/container';
import { Icon } from '../../ui/icon';
import { FlexStack } from '../../layout/flex-stack';
import { JobsHeader } from '../../components/jobs-header';
import css from './header.module.css';
import { Button } from '../../ui/button';

interface HeaderProps {
  jobs: React.ComponentProps<typeof JobsHeader>['jobs'];
}

export const Header = ({ className = '', jobs }: HeaderProps & React.ComponentProps<'header'>) => {
  const theme = useTheme();

  return (
    <Container as="header" className={cx(css.root, className)}>
      <FlexStack space="small" alignItems="center">
        <JobsHeader className={css.jobs} jobs={jobs} />
        <FlexStack space="xxxsmall" alignItems="center" className={css.tools}>
          {theme.name === 'dark' ? (
            <Button
              size="small"
              outline
              onClick={() => theme.update('light')}
              className={css.toolsButton}
            >
              <Icon glyph={Icon.ICONS.MOON} />
            </Button>
          ) : (
            <Button
              size="small"
              outline
              onClick={() => theme.update('dark')}
              className={css.toolsButton}
            >
              <Icon glyph={Icon.ICONS.SUN} />
            </Button>
          )}
          <Button
            size="small"
            outline
            as="a"
            href={config.gitHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={I18N.GITHUB_LINK_TITLE}
            aria-label={I18N.GITHUB_LINK_TITLE}
            className={css.toolsButton}
          >
            <Icon glyph={Icon.ICONS.GITHUB} />
          </Button>
        </FlexStack>
      </FlexStack>
    </Container>
  );
};
