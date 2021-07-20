import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import config from '../../config.json';
import { Container } from '../../ui/container';
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
              href={config.githubUrl}
              className={cx(css.navItem, css.navLink)}
              title="In-depth bundle analyzer for webpack(bundle size, assets, modules, packages)"
            >
              {`BundleStats `}
              {version}
            </ExternalLink>
            <span className={css.navItem}>
              <ExternalLink
                href={`${config.githubUrl}/issues`}
                className={css.navLink}
                title="Navigate to GitHub and open issue"
              >
                Report issue
              </ExternalLink>
            </span>
            <span className={css.navItem}>
              <span>Made by </span>
              <ExternalLink
                className={css.navLink}
                href={config.siteUrl}
                title="Go to RelativeCI - Specialized insights for web bundles"
              >
                RelativeCI
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
