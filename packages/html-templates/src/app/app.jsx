import PropTypes from 'prop-types';
import { App as BundleStatsApp } from '@bundle-stats/ui/lib-esm/app';

export const App = ({ jobs }) => <BundleStatsApp jobs={jobs} version={__VERSION__} />;

App.defaultProps = {
  jobs: [],
};

App.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
      insights: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      summary: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }),
  ),
};
