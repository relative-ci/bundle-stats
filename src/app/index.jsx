import { Router } from 'preact-router';

import Webpack from '../pages/webpack';
import Lighthouse from '../pages/lighthouse';
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
        <Route component={Webpack} path="/webpack" />
        <Route component={Lighthouse} path="/lighthouse" />
      </Router>
    </main>
  </div>
);

export default App;
