import { Router } from 'preact-router';
import { Logo, Footer, Header } from '@bundle-stats/ui';

import * as URLS from '../utils/urls';
import Webpack from '../pages/webpack';
import Lighthouse from '../pages/lighthouse';
import Browsertime from '../pages/browsertime';
import Redirect from './redirect';
import Route from './route';
import Navigation from './navigation';
import styles from './styles.css';

const App = () => (
  <div className={styles.root}>
    <Header
      className={styles.header}
      renderLeft={(sideProps) => (
        <div {...sideProps}>
          <Logo
            className={styles.headerBundleStatsLogo}
            kind="bundlestats"
            as="a"
            href="https://github.com/bundle-stats/bundle-stats"
            title="Go to Github"
          />
        </div>
      )}
      render={(sideProps) => (
        <div {...sideProps}>
          <Navigation className={styles.headerNavigation} />
        </div>
      )}
      renderRight={(sideProps) => (
        <div {...sideProps}>
          <Logo
            className={styles.headerGithubLogo}
            kind="github"
            as="a"
            href="https://github.com/bundle-stats/bundle-stats/tree/master/packages/web-compare"
            title="Go to Github"
          />
        </div>
      )}
    />
    <main className={styles.main}>
      <Router>
        <Redirect path="/" to="/webpack" />
        <Route component={Webpack} path={URLS.WEBPACK_PATH} />
        <Route component={Lighthouse} path={URLS.LIGHTHOUSE_PATH} />
        <Route component={Browsertime} path={URLS.BROWSERTIME_PATH} />
      </Router>
    </main>
    <Footer
      className={styles.footer}
      source="bundle-stats-web-compare"
    >
      <p className={styles.footerInfo}>
        <a
          href={`https://github.com/bundle-stats/bundle-stats/releases/tag/v${__VERSION__}`}
        >
          {`Version: ${__VERSION__}`}
        </a>
      </p>
    </Footer>
  </div>
);

export default App;
