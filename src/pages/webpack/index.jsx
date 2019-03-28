import PropTypes from 'prop-types';
import {
  BundleAssets,
  BundleAssetsTotalsTable,
  BundleAssetsTotalsChartBars,
  BundleAssetsTotalsChartPie,
} from '@relative-ci/ui';
import { isEmpty } from 'lodash';

import Helmet from '../../components/helmet';
import Sources from '../../components/sources';
import config from './config.json';
import locale from './locale.json';
import enhance from './container';
import styles from './styles.css';

const Webpack = (props) => {
  const {
    sources,
    addSource,
    removeSource,
    runs,
    jobs,
  } = props;

  return (
    <div>
      <Helmet
        title={locale.title}
        description={locale.description}
      />

      <Sources
        sources={sources}
        runs={runs}
        exampleUrls={config.exampleUrls}
        exampleText={locale.loadExample}
        addSource={addSource}
        removeSource={removeSource}
      />

      <div className={styles.panels}>
        <BundleAssetsTotalsChartBars
          className={styles.panel}
          jobs={jobs}
        />

        <BundleAssetsTotalsChartPie
          className={styles.panel}
          jobs={jobs}
        />
      </div>

      {!isEmpty(jobs) && (
        <BundleAssetsTotalsTable
          className={styles.totalsByType}
          jobs={jobs}
        />
      )}

      {!isEmpty(jobs) && (
        <BundleAssets
          className={styles.assets}
          jobs={jobs}
        />
      )}
    </div>
  );
};

Webpack.defaultProps = {
  sources: [],
  runs: [],
  jobs: [],
};

Webpack.propTypes = {
  sources: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  addSource: PropTypes.func.isRequired,
  removeSource: PropTypes.func.isRequired,
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  jobs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
    rawData: PropTypes.shape({
      webpack: PropTypes.shape({
        assets: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
          size: PropTypes.number,
        })),
      }),
    }),
  })),
};

export default enhance(Webpack);
