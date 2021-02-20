import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '../../ui';
import { getBundlePackagesByNameComponentLink } from '../../component-links';
import { ComponentLink } from '../component-link';
import css from './duplicate-packages-warning.module.css';

export const DuplicatePackagesWarning = (props) => {
  const { className, duplicatePackages, customComponentLink: CustomComponentLink } = props;

  const entries = Object.entries(duplicatePackages).map(([packageName, packageData]) => {
    // pre v3 structure
    if (Array.isArray(packageData)) {
      return [
        packageName,
        {
          value: null,
          children: packageData.map((packagePath) => ({
            name: packagePath,
            value: null,
          })),
        },
      ];
    }

    return [packageName, packageData];
  });

  return (
    <Alert kind="warning" className={className}>
      <h3 className={css.title}>
        {`Bundle contains ${entries.length} unique duplicate ${entries.length === 1 ? 'package' : 'packages'}:`}
      </h3>
      <ol className={css.packages}>
        {entries.map(([packageName, packageData]) => (
          <li key={packageName} className={css.item}>
            <CustomComponentLink
              className={css.itemTitle}
              {...getBundlePackagesByNameComponentLink(packageName)}
            >
              {packageName}
            </CustomComponentLink>
            <ul className={css.itemPackages}>
              {packageData.children.map(({ name, value }) => (
                <li key={name}>
                  {name}
                  {value}
                </li>
              ))}
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
  duplicatePackages: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

DuplicatePackagesWarning.defaultProps = {
  className: '',
  customComponentLink: ComponentLink,
};
