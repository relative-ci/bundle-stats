import { Router } from 'preact-router';

import Webpack from '../pages/webpack';
import styles from './app.css';

const App = () => (
  <div class={styles.root}>
    <Router>
      <Webpack path="/" />
    </Router>
  </div>
);

export default App;
