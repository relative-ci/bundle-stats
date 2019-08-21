import PropTypes from 'prop-types';
import { Box, Container, LighthouseTable } from '@bundle-stats/ui';

import Helmet from '../../components/helmet';
import Sources from '../../components/sources';
import config from './config.json';
import locale from './locale.json';
import enhance from './container';

const Lighthouse = (props) => {
  const {
    sources,
    runs,
    jobs,
    addSource,
    removeSource,
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
        addPlaceholder={locale.addPlaceholder}
        addSource={addSource}
        removeSource={removeSource}
      />

      {jobs.length > 0 && (
        <div>
          <Container>
            <Box>
              <LighthouseTable
                runs={runs}
                jobs={jobs}
              />
            </Box>
          </Container>
        </div>
      )}
    </div>
  );
};

Lighthouse.propTypes = {
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

export default enhance(Lighthouse);
