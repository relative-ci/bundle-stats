/* global module, window */
import { render } from 'preact';
import 'preact/debug';

import StandaloneApp from './apps/standalone';
import './default.css';

const jobs = window.__INITIAL_DATA__; // eslint-disable-line no-underscore-dangle

if (__DEVELOPMENT__) {
  require('preact/debug'); // eslint-disable-line global-require
}

let appElm = document.body.firstElementChild;

const renderStandaloneApp = () => {
  appElm = render(<StandaloneApp jobs={jobs} />, document.body, appElm);
};

if (module.hot) {
  module.hot.accept('./standalone.jsx', renderStandaloneApp);
}

renderStandaloneApp();
