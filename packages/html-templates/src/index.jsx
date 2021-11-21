/* global module, require */
/* eslint-disable import/no-import-module-exports */
import { render } from 'preact';

import './default.css';
import { App } from './app';
/* eslint-enable import/no-import-module-exports */

const jobs = window.__INITIAL_DATA__; // eslint-disable-line no-underscore-dangle

if (__DEVELOPMENT__) {
  require('preact/debug'); // eslint-disable-line global-require
}

let appElm = document.body.firstElementChild;

const renderStandaloneApp = () => {
  appElm = render(<App jobs={jobs} />, document.getElementById('root'), appElm);
};

if (module.hot) {
  module.hot.accept('./index.jsx', renderStandaloneApp);
}

renderStandaloneApp();
