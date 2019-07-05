import PropTypes from 'prop-types';
import {
  Box,
  BundleAssetsTotalsTable,
  BundleAssetsTotalsChartBars,
  BundleAssetsTotalsChartPie,
  Container,
  Panels,
} from '@bundle-stats/ui';

const Totals = (props) => {
  const { jobs } = props;

  return (
    <div>
      <Container>
        <Panels>
          <Box>
            <BundleAssetsTotalsChartPie jobs={jobs} />
          </Box>
          <Box>
            <BundleAssetsTotalsChartBars jobs={jobs} />
          </Box>
        </Panels>
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
