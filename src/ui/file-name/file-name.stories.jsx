import React from 'react';
import { storiesOf } from '@storybook/react';

import { FileName } from './file-name';

const stories = storiesOf('Ui/FileName', module);

const NAMES = [
  'styles.css',
  './src/components/sources/styles.css',
  'css ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/postcss-loader/src!./src/components/sources/source/styles.css',
];

stories.add('default', () => (
  <React.Fragment>
    {NAMES.map(name => (
      <div key={name} style={{ padding: '12px', outline: '1px dotted lightpink', margin: '12px' }}>
        <FileName name={name} />
      </div>
    ))}
  </React.Fragment>
));
