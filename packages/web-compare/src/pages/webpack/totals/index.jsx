import PropTypes from 'prop-types';
import {
  Box,
  BundleAssetsTotalsTable,
  BundleAssetsTotalsChartBars,
  Container,
} from '@bundle-stats/ui';

const Totals = (props) => {
  const { jobs } = props;

  return (
    <div>
      <Container>
        <BundleAssetsTotalsChartBars jobs={jobs} />
      </Container>
      <Container>
        <Box>
          <BundleAssetsTotalsTable jobs={jobs} />
        </Box>
      </Container>
    </div>
  );
};

Totals.defaultProps = {
  jobs: [],
};

Totals.propTypes = {
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

export default Totals;
