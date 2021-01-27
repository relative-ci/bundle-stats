import PropTypes from 'prop-types';
import { App as BundleStatsApp } from '@bundle-stats/ui/lib-esm/app';

import I18N from '../i18n';
import css from './app.module.css';

export const App = ({ jobs }) => (
  <BundleStatsApp
    jobs={jobs}
    footer={(
      <p className={css.footerInfo}>
        <a href={`https://github.com/relative-ci/bundle-stats/releases/tag/v${__VERSION__}`}>
          {`${I18N.VERSION}: ${__VERSION__}`}
        </a>
      </p>
    )}
  />
);

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
