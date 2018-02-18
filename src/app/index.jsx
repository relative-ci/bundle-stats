import { Router } from 'preact-router';

import Redirect from './redirect';
import Webpack from '../pages/webpack';
import Lighthouse from '../pages/lighthouse';
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
        <Webpack path="/webpack" />
        <Lighthouse path="/lighthouse" />
      </Router>
    </main>
  </div>
);

export default App;
