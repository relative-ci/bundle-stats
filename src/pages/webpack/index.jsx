import PropTypes from 'prop-types';

import Upload from '../../components/upload';
import Assets from '../../components/webpack/assets';
import enhance from './container';

const Webpack = props => (
  <div>
    <Upload onChange={props.addFile} />
    <Assets entries={props.entries} />
  </div>
);

Webpack.defaultProps = {
  addFile: () => {},
  entries: [],
};

Webpack.propTypes = {
  addFile: PropTypes.func,
  entries: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default enhance(Webpack);
