import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { SECTION_URLS } from '../constants';

export const ComponentLink = ({ section, title, params, ...props }) => {
  const location = {
    pathname: SECTION_URLS[section],
    state: params,
  };

  return <Link to={location} title={title} {...props} />;
};

ComponentLink.propTypes = {
  section: PropTypes.string.isRequired,
  title: PropTypes.string,
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ComponentLink.defaultProps = {
  title: '',
  params: {},
};
