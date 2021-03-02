import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getComponentStateQueryString } from '@bundle-stats/utils';

import { SECTION_URLS } from '../constants';

export const ComponentLink = ({ section, title, params, ...props }) => {
  const search = getComponentStateQueryString(params);
  const location = {
    pathname: SECTION_URLS[section],
    search,
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
