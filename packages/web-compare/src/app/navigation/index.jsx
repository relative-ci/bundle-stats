import PropType from 'prop-types';
import cx from 'classnames';
import Match from 'preact-router/match';
import { Link } from 'preact-router';
import { Tabs } from '@bundle-stats/ui';

import * as URLS from '../../utils/urls';
import styles from './styles.css';

const Navigation = ({ className }) => (
  <Match>
    {({ path }) => (
      <Tabs className={cx(styles.root, className)}>
        <Link
          className={styles.link}
          href={URLS.WEBPACK_HREF}
          isTabActive={path === URLS.WEBPACK_HREF}
        >
          Webpack
        </Link>
        <Link
          className={styles.link}
          href={URLS.LIGHTHOUSE_HREF}
          isTabActive={path === URLS.LIGHTHOUSE_HREF}
        >
          Lighthouse
        </Link>
        <Link
          className={styles.link}
          href={URLS.BROWSERTIME_HREF}
          isTabActive={path === URLS.BROWSERTIME_HREF}
        >
          Browsertime
        </Link>
      </Tabs>
    )}
  </Match>
);

Navigation.defaultProps = {
  className: '',
};

Navigation.propTypes = {
  /** Adopted child class name */
  className: PropType.string,
};

export default Navigation;
