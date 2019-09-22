import PropTypes from 'prop-types';
import { Box, BundlePackages, Container } from '@bundle-stats/ui';

const Packages = (props) => {
  const { jobs } = props;

  return (
    <Container>
      <Box>
        <BundlePackages jobs={jobs} />
      </Box>
    </Container>
  );
};

Packages.defaultProps = {
  jobs: [],
};

Packages.propTypes = {
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

export default Packages;
