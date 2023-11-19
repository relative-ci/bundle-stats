import { render } from 'preact';

import './default.css';
import { App } from './app';

const jobs = window.__INITIAL_DATA__; // eslint-disable-line no-underscore-dangle

render(<App jobs={jobs} />, document.getElementById('root'));
