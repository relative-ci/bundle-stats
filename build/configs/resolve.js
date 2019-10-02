const path = require('path');

module.exports = () => ({
  resolve: {
    extensions: ['.jsx', '.json', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      Fixtures: path.join(__dirname, '../../fixtures'),
    },
  },
});
