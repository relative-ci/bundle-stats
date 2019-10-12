import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Container } from '../../ui';
import css from './footer.module.css';

const DOMAIN = 'https://relative-ci.com';

/* eslint-disable jsx-a11y/anchor-has-content */
const StandardLink = ({ to, source, ...props }) => (
  <a
    href={`${DOMAIN}${to}?utm_source=${source}`}
    {...props}
  />
);
/* eslint-enable jsx-a11y/anchor-has-content */

StandardLink.propTypes = {
  /** Link to value */
  to: PropTypes.string.isRequired,

  /** UTM source */
  source: PropTypes.string.isRequired,
};

export const Footer = ({
  className, children, Link, source,
}) => (
  <Container className={cx(css.root, className)} as="footer">
    {children && (
      <div className={css.content}>
        {children}
      </div>
    )}
    <div className={css.info}>
      <div className={css.navigation}>
        <div className={css.navGroup}>
          <h3 className={css.navGroupTitle}>
            Documentation
          </h3>
          <nav className={css.nav}>
            <Link
              to="/documentation/setup"
              className={css.navLink}
              source={source}
            >
              Setup
            </Link>
            <Link
              to="/documentation/resources"
              className={css.navLink}
              source={source}
            >
              Resources
            </Link>
            <Link
              to="/changelog"
              className={css.navLink}
              source={source}
            >
              Changelog
            </Link>
            <a
              href="https://github.com/relative-ci/roadmap/issues"
              className={css.navLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Roadmap
            </a>
          </nav>
        </div>

        <div className={css.navGroup}>
          <h3 className={css.navGroupTitle}>
            Tools
          </h3>
          <nav className={css.nav}>
            <a
              href="https://github.com/relative-ci/bundle-stats"
              className={css.navLink}
              target="_blank"
              rel="noopener noreferrer"
              title="In-depth bundle analyzer for webpack(bundle size, assets, modules, packages)"
              source={source}
            >
              Bundle Stats
            </a>
            <a
              href={`https://compare.relative-ci.com/?utm_source=${source}`}
              className={css.navLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Side by side comparison for webpack/lighthouse/browsertime stats"
              source={source}
            >
              Compare
            </a>
            <a
              href={`https://video-compare.relative-ci.com/?utm_source=${source}`}
              className={css.navLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Side by side video playing for webpagetest / browsertime recordings."
            >
              Video Compare
            </a>
          </nav>
        </div>

        <div className={css.navGroup}>
          <h3 className={css.navGroupTitle}>
            Social
          </h3>
          <nav className={css.nav}>
            <a
              href="https://github.com/relative-ci"
              className={css.navLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="https://twitter.com/Relative_CI"
              className={css.navLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </nav>
        </div>
      </div>

      <div className={css.branding}>
        <Link
          className={css.copyright}
          to="/"
          title="Go to homepage"
          source={source}
        >
          &copy; 2019 Relative CI
        </Link>
      </div>
    </div>
  </Container>
);

Footer.defaultProps = {
  className: '',
  children: null,
  source: 'web',
  Link: StandardLink,
};

Footer.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Content */
  children: PropTypes.element,

  /** UTM source */
  source: PropTypes.string,

  /** Link component */
  Link: PropTypes.elementType,

};
