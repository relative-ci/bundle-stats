import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Container } from '../../ui/container';
import config from '../../config.json';
import css from './footer.module.css';

/* eslint-disable jsx-a11y/anchor-has-content */
const StandardLink = ({ to, source, ...props }) => (
  <a href={`${config.siteUrl}${to}?utm_source=${source}`} {...props} />
);
/* eslint-enable jsx-a11y/anchor-has-content */

StandardLink.propTypes = {
  /** Link to value */
  to: PropTypes.string.isRequired,

  /** UTM source */
  source: PropTypes.string.isRequired,
};

export const Footer = ({ className, children, Link, source }) => (
  <Container className={cx(css.root, className)} as="footer">
    {children && <div className={css.content}>{children}</div>}
    <div className={css.info}>
      <div className={css.navigation}>
        <div className={css.navGroup}>
          <h3 className={css.navGroupTitle}>
            <Link to="/documentation" className={css.navGroupTitleLink} source={source}>
              Documentation
            </Link>
          </h3>
          <nav className={css.nav}>
            <Link to="/documentation/setup" className={css.navLink} source={source}>
              Setup
            </Link>
            <Link to="/documentation/metrics-and-data" className={css.navLink} source={source}>
              Metrics and data
            </Link>
            <Link
              to="/documentation/front-end-ops-resources"
              className={css.navLink}
              source={source}
            >
              FrontEnd-Ops Resources
            </Link>
            <Link to="/releases" className={css.navLink} source={source}>
              Release notes
            </Link>
            <Link to="/documentation/faq" className={css.navLink} source={source}>
              FAQ
            </Link>
            <a href="https://github.com/relative-ci/roadmap/issues" className={css.navLink}>
              Roadmap
            </a>
          </nav>
        </div>

        <div className={css.navGroup}>
          <h3 className={css.navGroupTitle}>Tools</h3>
          <nav className={css.nav}>
            <a
              href="https://github.com/relative-ci/bundle-stats"
              className={css.navLink}
              target="_blank"
              rel="noopener noreferrer"
              title="In-depth bundle analyzer for webpack(bundle size, assets, modules, packages)"
            >
              Bundle Stats
            </a>
            <a
              href={`https://compare.relative-ci.com/?utm_source=${source}`}
              className={css.navLink}
              title="Side by side comparison for webpack/lighthouse/browsertime stats"
            >
              Compare
            </a>
            <a
              href={`https://video-compare.relative-ci.com/?utm_source=${source}`}
              className={css.navLink}
              title="Side by side video playing for webpagetest / browsertime recordings."
            >
              Video Compare
            </a>
          </nav>
        </div>

        <div className={css.navGroup}>
          <h3 className={css.navGroupTitle}>Social</h3>
          <nav className={css.nav}>
            <a href="https://github.com/relative-ci" className={css.navLink}>
              Github
            </a>
            <a href="https://twitter.com/Relative_CI" className={css.navLink}>
              Twitter
            </a>
          </nav>
        </div>
      </div>

      <div className={css.branding}>
        <Link className={css.copyright} to="/" title="Go to homepage" source={source}>
          &copy;
          {` ${new Date().getFullYear()} ${config.appName}`}
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
  children: PropTypes.node,

  /** UTM source */
  source: PropTypes.string,

  /** Link component */
  Link: PropTypes.elementType,
};
