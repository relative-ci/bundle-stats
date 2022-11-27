import '../../src/default.css';
import './preview.css';

if (process.env.NODE_ENV === 'development') {
  require('preact/debug'); // eslint-disable-line global-require
}
