import PropTypes from 'prop-types';

import Assets from '../../components/webpack/assets';
import enhance from './container';

const Webpack = ({ assets }) => (
  <div>
    <Assets runs={assets} />
  </div>
);

Webpack.defaultProps = {
  assets: [],
};

Webpack.propTypes = {
  assets: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default enhance(Webpack);
