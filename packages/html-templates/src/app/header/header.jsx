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
        <h1 className={css.title}>
          BundleStats
        </h1>
      </div>
    )}
    render={(partProps) => (
      <div {...partProps}>
        <Tabs className={cx(css.center, css.tabs)}>
          <a
            href="#totals"
            title="Go to Totals section"
          >
            Totals
          </a>
          <a
            href="#assets"
            title="Go to Assets section"
          >
            Assets
          </a>
          <a
            href="#modules"
            title="Go to Modules section"
          >
            Modules
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
          href="https://github.com/bundle-stats/bundle-stats"
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
