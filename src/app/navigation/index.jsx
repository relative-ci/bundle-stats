import { Link } from 'preact-router/match';

import styles from './styles.css';

const Navigation = () => (
  <ul class={styles.root}>
    <li class={styles.item}>
      <Link
        class={styles.link}
        activeClassName={styles.linkActive}
        href="/webpack"
      >
        Webpack
      </Link>
    </li>
  </ul>
);

export default Navigation;
