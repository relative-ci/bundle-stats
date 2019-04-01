import Router from 'preact-router';
import Match from 'preact-router/match';
import PropTypes from 'prop-types';
import { Container, Summary, Tabs } from '@relative-ci/ui';
import { isEmpty } from 'lodash';

import Helmet from '../../components/helmet';
import Sources from '../../components/sources';
import Totals from './totals';
import Assets from './assets';
import Modules from './modules';
import config from './config.json';
import locale from './locale.json';
import enhance from './container';
import style from './style.css';

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
          <Container className={style.tabs}>
            <Match>
              {({ path }) => (
                <Tabs className={style.tabs}>
                  <a
                    href="/webpack"
                    isActive={path === '/webpack'}
                  >
                    Totals
                  </a>
                  <a
                    href="/webpack/assets"
                    isActive={path === '/webpack/assets'}
                  >
                    Assets
                  </a>
                  <a
                    href="/webpack/modules"
                    isActive={path === '/webpack/modules'}
                  >
                    Modules
                  </a>
                </Tabs>
              )}
            </Match>
          </Container>
          <Router>
            <Totals jobs={jobs} path="/webpack" />
            <Assets jobs={jobs} path="/webpack/assets" />
            <Modules jobs={jobs} path="/webpack/modules" />
          </Router>
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
