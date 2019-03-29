import React from 'react';
import PropTypes from 'prop-types';

import { SummaryItem } from '../summary-item';
import css from './summary.css';

export const Summary = ({ data, keys, loading }) => (
  <div className={css.root}>
    {keys.map(key => (
      <SummaryItem
        key={key}
        className={css.item}
        id={key}
        data={data}
        loading={loading}
      />
    ))}
  </div>
);

Summary.defaultProps = {
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
  data: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      baseline: PropTypes.number,
      current: PropTypes.number,
    }),
  }),
  keys: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};
