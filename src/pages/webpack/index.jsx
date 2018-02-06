import PropTypes from 'prop-types';
import Helmet from 'preact-helmet';

import Assets from '../../components/webpack/assets';
import enhance from './container';

const Webpack = ({ assets }) => (
  <div>
    {totalByType.length > 0 && (
      <div className={styles.totalByType}>
        <TotalByTypeTable runs={totalByType} />
      </div>
    )}

    {assets.length > 0 && (
      <div className={styles.assets}>
        <Assets
          runs={assets}
          className={styles.assets}
        />
      </div>
    )}
  </div>
);

Webpack.defaultProps = {
  assets: [],
};

Webpack.propTypes = {
  assets: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default enhance(Webpack);
