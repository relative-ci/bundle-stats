import PropTypes from 'prop-types';
import Helmet from 'preact-helmet';
import { Container, BrowsertimeTable } from '@bundle-stats/ui';

import Sources from '../../components/sources';
import config from './config.json';
import locale from './locale.json';
import enhance from './container';
import css from './style.css';

const Browsertime = (props) => {
  const {
    sources,
    runs,
    jobs,
    addSource,
    removeSource,
  } = props;

  return (
    <div className={css.root}>
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

      {jobs.length > 0 && (
        <div className={css.main}>
          <Container>
            <BrowsertimeTable
              runs={runs}
              jobs={jobs}
            />
          </Container>
        </div>
      )}
    </div>
  );
};

Browsertime.propTypes = {
  /** JSON sources */
  sources: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types

  /** Metric runs */
  runs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types

  /** Jobs data */
  jobs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types

  /** Add sources handler */
  addSource: PropTypes.func.isRequired,

  /** Remove source handler */
  removeSource: PropTypes.func.isRequired,
};

export default enhance(Browsertime);
