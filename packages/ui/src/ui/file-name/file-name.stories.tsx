import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { FileName } from './file-name';

// FileName is a plain .jsx component with defaultProps instead of inline
// destructuring defaults, so TS can't infer its props as optional on its own.
const TypedFileName = FileName as unknown as React.ComponentType<{
  className?: string;
  as?: React.ElementType;
  name?: React.ReactNode;
}>;

const meta = {
  title: 'Ui/FileName',
  component: TypedFileName,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof TypedFileName>;

export default meta;

type Story = StoryObj<typeof meta>;

const NAMES = [
  'styles.css',
  './src/components/sources/styles.css',
  'css ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/postcss-loader/src!./src/components/sources/source/styles.css',
  'rreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordeallylongwordrreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordeallylongwordrreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordreallylongwordeallylongword',
];

export const Default: Story = {
  render: () => (
    <div>
      {NAMES.map((name) => (
        <div
          key={name}
          style={{ padding: '12px', outline: '1px dotted lightpink', margin: '12px' }}
        >
          <TypedFileName name={name} />
        </div>
      ))}
    </div>
  ),
};
