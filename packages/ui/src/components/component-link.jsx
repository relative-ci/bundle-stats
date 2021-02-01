import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { encodeQueryParams, JsonParam } from 'use-query-params';
import { stringify } from 'query-string';

import { SECTION_URLS } from '../constants';

export const ComponentLink = ({ section, title, params, ...props }) => {
  const meta = Object.keys(params).reduce(
    (agg, componentName) => ({
      ...agg,
      [componentName]: JsonParam,
    }),
    {},
  );

  const location = {
    pathname: SECTION_URLS[section],
    search: stringify(encodeQueryParams(meta, params)),
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
