/* global module */
import { storiesOf } from '@storybook/react';

import Upload from './';

const codeStyles = {
  margin: '1rem 0',
  padding: '1rem',
  display: 'block',
  height: '60vh',
  overflow: 'auto',
  background: '#eee',
};

storiesOf('Components/Upload', module)
  .add('default', () => (
    <Upload>
      {file => (
        <pre>
          <code style={codeStyles}>
            {JSON.stringify(file, null, 2)}
          </code>
        </pre>
      )}
    </Upload>
  ));
