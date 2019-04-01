import PropTypes from 'prop-types';
import { Container, Summary } from '@relative-ci/ui';
import { isEmpty } from 'lodash';

import Helmet from '../../components/helmet';
import Sources from '../../components/sources';
import Totals from './totals';
import config from './config.json';
import locale from './locale.json';
import enhance from './container';

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

      {!isEmpty(jobs) && (
        <div>
          <Container>
            <Summary data={jobs[0].summary} />
          </Container>
          <Totals jobs={jobs} />
        </div>
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
