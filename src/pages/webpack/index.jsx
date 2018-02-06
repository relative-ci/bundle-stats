import PropTypes from 'prop-types';

import Assets from '../../components/webpack/assets';
import TotalByTypeTable from '../../components/webpack/total-by-type-table';
import enhance from './container';
import styles from './styles.css';

const Webpack = ({ assets, totalByType }) => (
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
  totalByType: [],
  assets: [],
};

Webpack.propTypes = {
  totalByType: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  assets: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default enhance(Webpack);
