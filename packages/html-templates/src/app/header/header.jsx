import PropTypes from 'prop-types';
import cx from 'classnames';
import { Header as UIHeader } from '@bundle-stats/ui/lib-esm/layout/header';
import { Logo } from '@bundle-stats/ui/lib-esm/ui/logo';

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
