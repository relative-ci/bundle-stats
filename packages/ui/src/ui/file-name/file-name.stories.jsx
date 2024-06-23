import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { FileName } from './file-name';

export default {
  title: 'Ui/FileName',
  component: FileName,
  decorators: [getWrapperDecorator()],
};

const NAMES = [
  'styles.css',
  './src/components/sources/styles.css',
  'css ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/postcss-loader/src!./src/components/sources/source/styles.css',
  'rreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordeallylongwordrreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordeallylongwordrreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordeallylongword',
];

export const Default = () => (
  <div>
    {NAMES.map((name) => (
      <div key={name} style={{ padding: '12px', outline: '1px dotted lightpink', margin: '12px' }}>
        <FileName name={name} />
      </div>
    ))}
  </div>
);
