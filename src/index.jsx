/* global module */
import { render } from 'preact';

import App from './app';
import './index.css';

let appElm = document.body.firstElementChild;

const renderApp = () => {
  appElm = render(<App />, document.body, appElm);
};

if (module.hot) {
  module.hot.accept('./index.jsx', renderApp);
}

renderApp();
