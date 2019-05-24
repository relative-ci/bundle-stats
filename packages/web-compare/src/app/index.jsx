import { Router } from 'preact-router';
import { Logo, Footer } from '@bundle-stats/ui';

import * as URLS from '../utils/urls';
import Webpack from '../pages/webpack';
import Lighthouse from '../pages/lighthouse';
import Browsertime from '../pages/browsertime';
import Redirect from './redirect';
import Route from './route';
import Navigation from './navigation';
import styles from './styles.css';

const App = () => (
  <div>
    <header className={styles.header}>
      <Logo
        className={styles.headerRelativeLogo}
        as="a"
        href="https://relative-ci.com"
        title="Go to relative-ci.com"
      />
      <Navigation className={styles.headerNavigation} />
      <Logo
        className={styles.headerGithubLogo}
        kind="github"
        as="a"
        href="https://github.com/bundle-stats/bundle-stats"
        title="Go to Github"
      />
    </header>
    <main className={styles.main}>
      <Router>
        <Redirect path="/" to="/webpack" />
        <Route component={Webpack} path={URLS.WEBPACK_PATH} />
        <Route component={Lighthouse} path={URLS.LIGHTHOUSE_PATH} />
        <Route component={Browsertime} path={URLS.BROWSERTIME_PATH} />
      </Router>
    </main>
    <Footer />
  </div>
);

export default App;
