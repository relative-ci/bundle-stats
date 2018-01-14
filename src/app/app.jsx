import { Router } from 'preact-router';

import Redirect from './redirect';
import Webpack from '../pages/webpack';
import styles from './app.css';

const App = () => (
  <div class={styles.root}>
    <Router>
      <Redirect path="/" to="/webpack" />
      <Webpack path="/webpack" />
    </Router>
  </div>
);

export default App;
