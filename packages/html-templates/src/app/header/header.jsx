import PropTypes from 'prop-types';
import cx from 'classnames';
import { Header as UIHeader } from '@bundle-stats/ui/lib-esm/layout/header';
import { Logo } from '@bundle-stats/ui/lib-esm/ui/logo';
import { Tabs } from '@bundle-stats/ui/lib-esm/ui/tabs';

import css from './header.module.css';

export const Header = ({ className }) => (
  <UIHeader
    className={cx(css.root, className)}
    renderLeft={(partProps) => (
      <div {...partProps}>
        <a className={css.branding} href="https://github.com/relative-ci/bundle-stats">
          <Logo className={css.logo}>BundleStats</Logo>
          <Logo className={css.logotype} kind="logotype" />
        </a>
      </div>
    )}
    render={(partProps) => (
      <div {...partProps}>
        <Tabs className={cx(css.center, css.tabs)}>
          <a
            href="#totals"
            title="Go to Totals section"
            className={css.tabItem}
          >
            Totals
          </a>
          <a
            href="#assets"
            title="Go to Assets section"
            className={css.tabItem}
          >
            Assets
          </a>
          <a
            href="#modules"
            title="Go to Modules section"
            className={css.tabItem}
          >
            Modules
          </a>
          <a
            href="#packages"
            title="Go to Packages section"
            className={css.tabItem}
          >
            Packages
          </a>
        </Tabs>
      </div>
    )}
    renderRight={(partProps) => (
      <div {...partProps}>
        <Logo
          className={css.githubLogo}
          kind="github"
          as="a"
          href="https://github.com/relative-ci/bundle-stats"
          target="_blank"
          rel="noopener noreferrer nofollow"
        />
      </div>
    )}
  />
);

Header.defaultProps = {
  className: '',
};

Header.propTypes = {
  /** Adopted child classname */
  className: PropTypes.string,
};
