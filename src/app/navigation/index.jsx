import { Link } from 'preact-router/match';

import * as URLS from '../../utils/urls';
import styles from './styles.css';

const Navigation = () => (
  <ul class={styles.root}>
    <li class={styles.item}>
      <Link
        class={styles.link}
        activeClassName={styles.linkActive}
        href={URLS.WEBPACK_HREF}
      >
        Webpack
      </Link>
      <Link
        class={styles.link}
        activeClassName={styles.linkActive}
        href={URLS.LIGHTHOUSE_HREF}
      >
        Lighthouse
      </Link>
      <Link
        class={styles.link}
        activeClassName={styles.linkActive}
        href={URLS.BROWSERTIME_HREF}
      >
        Browsertime
      </Link>
    </li>
  </ul>
);

export default Navigation;
