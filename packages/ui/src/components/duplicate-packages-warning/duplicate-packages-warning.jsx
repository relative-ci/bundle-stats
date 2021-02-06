import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '../../ui';
import { getBundlePackagesByNameComponentLink } from '../../component-links';
import { ComponentLink } from '../component-link';
import css from './duplicate-packages-warning.module.css';

export const DuplicatePackagesWarning = (props) => {
  const { className, duplicatePackages, customComponentLink: CustomComponentLink } = props;

  const entries = Object.entries(duplicatePackages);

  return (
    <Alert kind="warning" className={className}>
      <h3 className={css.title}>
        {`Bundle contains ${entries.length} unique duplicate ${entries.length === 1 ? 'package' : 'packages'}:`}
      </h3>
      <ol className={css.packages}>
        {entries.map(([key, paths]) => (
          <li key={key} className={css.item}>
            <CustomComponentLink className={css.itemTitle} {...getBundlePackagesByNameComponentLink(key)}>
              {key}
            </CustomComponentLink>
            <ul className={css.itemPackages}>
              {paths.map((path) => <li key={path}>{path}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </Alert>
  );
};

DuplicatePackagesWarning.propTypes = {
  className: PropTypes.string,
  customComponentLink: PropTypes.elementType,
  duplicatePackages: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

DuplicatePackagesWarning.defaultProps = {
  className: '',
  customComponentLink: ComponentLink,
};
