/* global module */
import { render } from 'preact';
import 'preact/debug';

import App from './app';
import './index.css';
import './analytics';

let appElm = document.body.firstElementChild;

const renderApp = () => {
  appElm = render(<App />, document.body, appElm);
};

if (module.hot) {
  module.hot.accept('./index.jsx', renderApp);
}

renderApp();
