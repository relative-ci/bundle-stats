import PropTypes from 'prop-types';
import { createStatsSummary } from '@bundle-stats/utils';
import { Box } from '@bundle-stats/ui/lib-esm/ui/box';
import { Container } from '@bundle-stats/ui/lib-esm/ui/container';
import { JobsHeader } from '@bundle-stats/ui/lib-esm/components/jobs-header';
import { DuplicatePackagesWarning } from '@bundle-stats/ui/lib-esm/components/duplicate-packages-warning';
import { Summary } from '@bundle-stats/ui/lib-esm/components/summary';
import { BundleAssets } from '@bundle-stats/ui/lib-esm/components/bundle-assets';
import { BundleAssetsTotalsChartBars } from '@bundle-stats/ui/lib-esm/components/bundle-assets-totals-chart-bars';
import { Footer } from '@bundle-stats/ui/lib-esm/layout/footer';
import { BundleAssetsTotalsTable } from '@bundle-stats/ui/lib-esm/components/bundle-assets-totals-table';
import { BundleModules } from '@bundle-stats/ui/lib-esm/components/bundle-modules';
import { BundlePackages } from '@bundle-stats/ui/lib-esm/components/bundle-packages';

import { Header } from './header';
import css from './styles.css';

const StandaloneAppLayout = (props) => (
  <div className={css.root}>
    <Header className={css.header} />
    <div
      className={css.main}
      {...props}
    />
    <Footer source="bundle-stats">
      <p className={css.footerInfo}>
        <a
          href={`https://github.com/relative-ci/bundle-stats/releases/tag/v${__VERSION__}`}
        >
          {`Version: ${__VERSION__}`}
        </a>
      </p>
    </Footer>
  </div>
);

const getSummaryData = (jobs) => {
  if (jobs.length <= 2) {
    return jobs[0].summary;
  }

  return createStatsSummary(jobs[jobs.length - 1].stats, jobs[0].stats);
};


const StandaloneApp = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <StandaloneAppLayout>
        <Container>
          <div className={css.empty}>
            No data available.
          </div>
        </Container>
      </StandaloneAppLayout>
    );
  }

  const warnings = jobs[0] && jobs[0].warnings;

  return (
    <StandaloneAppLayout>
      <Container>
        <JobsHeader jobs={jobs} />
      </Container>
      <Container>
        <Summary data={getSummaryData(jobs)} />
      </Container>
      {warnings && warnings.duplicatePackages && (
        <Container>
          <DuplicatePackagesWarning duplicatePackages={warnings.duplicatePackages} />
        </Container>
      )}
      <Container>
        <BundleAssetsTotalsChartBars jobs={jobs} />
      </Container>
      <Container>
        <h2>
          <a
            href="#totals"
            id="totals"
            className={css.anchor}
          >
            Totals
          </a>
        </h2>
        <Box>
          <BundleAssetsTotalsTable jobs={jobs} />
        </Box>
      </Container>
      <Container>
        <h2>
          <a
            id="assets"
            href="#assets"
            className={css.anchor}
          >
            Assets
          </a>
        </h2>
        <Box>
          <BundleAssets jobs={jobs} />
        </Box>
      </Container>
      <Container>
        <h2>
          <a
            id="modules"
            href="#modules"
            className={css.anchor}
          >
            Modules
          </a>
        </h2>
        <BundleModules jobs={jobs} />
      </Container>
      <Container>
        <h2>
          <a
            id="packages"
            href="#packages"
            className={css.anchor}
          >
            Packages
          </a>
        </h2>
        <Box>
          <BundlePackages jobs={jobs} />
        </Box>
      </Container>
    </StandaloneAppLayout>
  );
};

StandaloneApp.defaultProps = {
  jobs: [],
};

StandaloneApp.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
    warnings: PropTypes.object,
  })),
};

export default StandaloneApp;
