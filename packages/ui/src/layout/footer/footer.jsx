import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import config from '../../config.json';
import { Container } from '../../ui/container';
import I18N from '../../i18n';
import { Box } from '../box';
import { Stack } from '../stack';
import css from './footer.module.css';

/* eslint-disable jsx-a11y/anchor-has-content */
const ExternalLink = (props) => <a target="_blank" rel="noopener noreferrer" {...props} />;
/* eslint-enable jsx-a11y/anchor-has-content */

ExternalLink.propTypes = {
  /** Link to value */
  to: PropTypes.string.isRequired,
};

export const Footer = ({ className, version }) => (
  <Container as="footer" className={cx(css.root, className)}>
    <Box padding={['medium', 'none']} className={css.inner}>
      <Stack space="xsmall">
        <div>
          <nav className={css.nav}>
            <ExternalLink
              href={config.gitHubUrl}
              className={cx(css.navItem, css.navLink)}
              title={I18N.GITHUB_LINK_TITLE}
            >
              {`BundleStats ${version}`}
            </ExternalLink>
            <span className={css.navItem}>
              <ExternalLink
                href={`${config.gitHubUrl}/issues`}
                className={css.navLink}
                title={I18N.REPORT_ISSUE_LINK_TITLE}
              >
                {I18N.REPORT_ISSUE}
              </ExternalLink>
            </span>
            <span className={css.navItem}>
              <span>Made by </span>
              <ExternalLink
                className={css.navLink}
                href={config.siteUrl}
                title={I18N.APP_LINK_TITLE}
              >
                {config.appName}
              </ExternalLink>
            </span>
          </nav>
        </div>
      </Stack>
    </Box>
  </Container>
);

Footer.defaultProps = {
  className: '',
  version: null,
};

Footer.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Content */
  version: PropTypes.string,
};
