import PropTypes from 'prop-types';
import { Box } from '@bundle-stats/ui/lib-esm/ui/box';
import { Container } from '@bundle-stats/ui/lib-esm/ui/container';
import { Summary } from '@bundle-stats/ui/lib-esm/components/summary';
import { BundleAssets } from '@bundle-stats/ui/lib-esm/components/bundle-assets';
import { Footer } from '@bundle-stats/ui/lib-esm/layout/footer';
import { BundleAssetsTotalsTable } from '@bundle-stats/ui/lib-esm/components/bundle-assets-totals-table';
import { BundleModules } from '@bundle-stats/ui/lib-esm/components/bundle-modules';

import { Header } from './header';
import css from './styles.css';

const StandaloneAppLayout = props => (
  <div className={css.root}>
    <Header className={css.header} />
    <div
      className={css.main}
      {...props}
    />
    <Footer
      className={css.footer}
      source="webpack-bundle-stats"
    />
  </div>
);

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

  return (
    <StandaloneAppLayout>
      <Container>
        <Summary data={jobs[0].summary} />
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
    </StandaloneAppLayout>
  );
};

StandaloneApp.defaultProps = {
  jobs: [],
};

StandaloneApp.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
  })),
};

export default StandaloneApp;
