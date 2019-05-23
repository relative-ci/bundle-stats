import PropTypes from 'prop-types';
import {
  Box,
  BundleAssetsTotalsTable,
  BundleAssetsTotalsChartBars,
  BundleAssetsTotalsChartPie,
  Container,
  Panels,
} from '@relative-ci/ui';

const Totals = (props) => {
  const { jobs } = props;

  return (
    <div>
      <Container>
        <Panels>
          <Box>
            <BundleAssetsTotalsChartBars jobs={jobs} />
          </Box>
          <Box>
            <BundleAssetsTotalsChartPie jobs={jobs} />
          </Box>
        </Panels>
      </Container>

      <Container>
        <BundleAssetsTotalsTable jobs={jobs} />
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
