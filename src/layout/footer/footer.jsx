import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Container, Logo } from '../../ui';
import css from './footer.module.css';

const DOMAIN = 'https://relative-ci.com';

/* eslint-disable jsx-a11y/anchor-has-content */
const StandardLink = ({ to, ...props }) => (
  <a
    href={`${DOMAIN}${to}`}
    {...props}
  />
);
/* eslint-enable jsx-a11y/anchor-has-content */

StandardLink.propTypes = {
  /** Link to value */
  to: PropTypes.string.isRequired,
};

export const Footer = ({ className, Link }) => (
  <footer className={cx(css.root, className)}>
    <Container>
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
              >
                Setup
              </Link>
              <Link
                to="/documentation/resources"
                className={css.navLink}
              >
                Resources
              </Link>
            </nav>
          </div>

          <div className={css.navGroup}>
            <h3 className={css.navGroupTitle}>
              Tools
            </h3>
            <nav className={css.nav}>
              <a
                href="https://compare.relative-ci.com/"
                className={css.navLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Side by side comparison for webpack/lighthouse/browsertime stats"
              >
                Compare
              </a>
              <a
                href="https://video-compare.relative-ci.com/"
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

        <p className={css.copyright}>
          &copy; 2019 Relative CI
        </p>
      </div>

      <div className={css.branding}>
        <Link
          className={css.brandingHome}
          to="/"
          title="Go to homepage"
        >
          <Logo className={css.brandingLogo} />
          <span className={css.brandingLogotype}>
            Relative CI
          </span>
        </Link>
      </div>
    </Container>
  </footer>
);

Footer.defaultProps = {
  className: '',
  Link: StandardLink,
};

Footer.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Link component */
  Link: PropTypes.elementType,
};
