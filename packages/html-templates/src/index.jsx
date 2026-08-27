import { render } from 'preact';

import SvgIcons from '@bundle-stats/ui/assets/icons.svg?react';
import './default.css';
import { App } from './app';

const jobs = window.__INITIAL_DATA__; // eslint-disable-line no-underscore-dangle

render(
  <>
    <App jobs={jobs} />
    <div style={{ position: 'absolute', width: 0, height: 0 }}>
      <SvgIcons />
    </div>
  </>,
  document.getElementById('root'),
);
