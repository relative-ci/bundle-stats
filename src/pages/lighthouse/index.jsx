import PropTypes from 'prop-types';

import Helmet from '../../components/helmet';
import Sources from '../../components/sources';
import MetricsTable from '../../components/metrics-table';
import config from './config.json';
import locale from './locale.json';
import enhance from './container';

const Lighthouse = (props) => {
  const {
    sources,
    runs,
    rows,
    addSource,
    removeSource,
    addSources,
  } = props;

  return (
    <div>
      <Helmet
        title={locale.title}
        description={locale.description}
      />

      <Sources
        sources={sources}
        exampleUrls={config.exampleUrls}
        exampleText={locale.loadExample}
        onAddFormSubmit={addSource}
        onSourceRemove={removeSource}
        addSources={addSources}
      />

      {rows.length > 0 && (
        <MetricsTable
          runs={runs}
          rows={rows}
        />
      )}
    </div>
  );
};

Lighthouse.propTypes = {
  /** JSON sources */
  sources: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types

  /** Metric runs */
  runs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types

  /** Metric rows */
  rows: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types

  /** Add source handler */
  addSource: PropTypes.func.isRequired,

  /** Add sources handler */
  addSources: PropTypes.func.isRequired,

  /** Remove source handler */
  removeSource: PropTypes.func.isRequired,
};

export default enhance(Lighthouse);
