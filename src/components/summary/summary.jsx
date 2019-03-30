import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { SummaryItem } from '../summary-item';
import css from './summary.css';

export const Summary = ({
  className, data, keys, loading,
}) => (
  <div className={cx(css.root, className)}>
    <div className={css.items}>
      {keys.map(key => (
        <SummaryItem
          key={key}
          className={css.item}
          id={key}
          data={data && data[key]}
          loading={loading}
        />
      ))}
    </div>
  </div>
);

Summary.defaultProps = {
  className: '',
  data: null,
  keys: [
    'webpack.assets.totalSizeByTypeALL',
    'webpack.assets.totalInitialSizeJS',
    'webpack.assets.totalInitialSizeCSS',
    'webpack.cacheInvalidation',
    'webpack.modulesCount',
    'webpack.chunksCount',
    'webpack.assetsCount',
  ],
  loading: false,
};

Summary.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      baseline: PropTypes.number,
      current: PropTypes.number,
    }),
  }),
  keys: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};
