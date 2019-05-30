import PropTypes from 'prop-types';
import { BundleModules, Container } from '@bundle-stats/ui';

const Modules = (props) => {
  const { jobs } = props;

  return (
    <Container>
      <BundleModules jobs={jobs} />
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
