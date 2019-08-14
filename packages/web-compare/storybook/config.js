import { configure } from '@storybook/react';

import '../src/default.css';
import './preview.css';

const req = require.context('../src', true, /stories\.jsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
