import PropTypes from 'prop-types';
import PreactHelmet from 'preact-helmet';

import config from '../../config/app.json';

const Helmet = ({ title, description }) => (
  <PreactHelmet
    title={title}
    titleTemplate={`%s - ${config.title}`}
    meta={[
      {
        name: 'description',
        content: description,
      },
    ]}
  />
);

Helmet.defaultProps = {
  description: '',
};

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
  /** Meta description */
  description: PropTypes.string,
};

export default Helmet;
