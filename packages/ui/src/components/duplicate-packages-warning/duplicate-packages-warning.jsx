import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '../../ui';
import css from './duplicate-packages-warning.module.css';

export const DuplicatePackagesWarning = (props) => {
  const { className, duplicatePackages } = props;

  const entries = Object.entries(duplicatePackages);

  return (
    <Alert kind="warning" className={className}>
      <h5 className={css.title}>
        {`${entries.length} duplicate ${entries.length === 1 ? 'package' : 'packages'}:`}
      </h5>
      {entries.map(([key, paths]) => (
        <p className={css.item}>
          {`${key}: ${paths.join(', ')}`}
        </p>
      ))}
    </Alert>
  );
};

DuplicatePackagesWarning.propTypes = {
  className: PropTypes.string,
  duplicatePackages: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

DuplicatePackagesWarning.defaultProps = {
  className: '',
};
