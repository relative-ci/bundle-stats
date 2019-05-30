/* global module */
import { render } from 'preact';
import 'preact/debug';

import App from './app';
import './default.css';
import './analytics';

if (__DEVELOPMENT__) {
  require('preact/debug'); // eslint-disable-line global-require
}

let appElm = document.body.firstElementChild;

const renderApp = () => {
  appElm = render(<App />, document.body, appElm);
};

if (module.hot) {
  module.hot.accept('./index.jsx', renderApp);
}

renderApp();
