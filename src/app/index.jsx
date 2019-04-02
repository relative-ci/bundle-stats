import { Router } from 'preact-router';

import * as URLS from '../utils/urls';
import Webpack from '../pages/webpack';
import Lighthouse from '../pages/lighthouse';
import Browsertime from '../pages/browsertime';
import Redirect from './redirect';
import Route from './route';
import Logo from './logo';
import Navigation from './navigation';
import styles from './styles.css';

const App = () => (
  <div>
    <header class={styles.header}>
      <div class={styles.headerInner}>
        <Logo />
        <Navigation />
      </div>
    </header>
    <main class={styles.main}>
      <Router>
        <Redirect path="/" to="/webpack" />
        <Route component={Webpack} path={URLS.WEBPACK_PATH} />
        <Route component={Lighthouse} path={URLS.LIGHTHOUSE_PATH} />
        <Route component={Browsertime} path={URLS.BROWSERTIME_PATH} />
      </Router>
    </main>
  </div>
);

export default App;
