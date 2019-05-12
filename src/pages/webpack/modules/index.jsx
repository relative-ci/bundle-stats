import PropTypes from 'prop-types';
import { get } from 'lodash';
import { BundleModules, Container } from '@relative-ci/ui';

const Modules = (props) => {
  const { jobs } = props;

  return (
    <Container>
      <BundleModules
        currentRawData={get(jobs, '[0].rawData')}
        baselineRawData={get(jobs, '[1].rawData')}
        job={jobs[0]}
      />
    </Container>
  );
};

Modules.defaultProps = {
  jobs: [],
};

Modules.propTypes = {
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

export default Modules;
