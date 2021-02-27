import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BUNDLE_PACKAGES_DUPLICATE, METRIC_TYPE_NUMERIC, METRIC_TYPES, getMetricRunInfo } from '@bundle-stats/utils';

import { Alert } from '../../ui';
import { ComponentLink } from '../component-link';
import { Delta } from '../delta';
import css from './duplicate-packages-warning.module.css';

const numberMetric = METRIC_TYPES[METRIC_TYPE_NUMERIC];

export const DuplicatePackagesWarning = (props) => {
  const { className, duplicatePackagesCount, customComponentLink: CustomComponentLink } = props;

  const metricRunInfo = getMetricRunInfo(
    numberMetric,
    duplicatePackagesCount.current,
    duplicatePackagesCount.baseline,
  );

  return (
    <Alert kind="warning" className={cx(css.root, className)}>
      <h3 className={css.title}>
        {`Bundle contains`}
        {` `}
        <CustomComponentLink {...BUNDLE_PACKAGES_DUPLICATE}>
          {metricRunInfo.value}
          <Delta
            className={css.titleDelta}
            inverted
            displayValue={metricRunInfo.displayDelta}
            deltaType={metricRunInfo.deltaType}
          />
          {` `}
          {`duplicate ${metricRunInfo.value === 1 ? 'package' : 'packages'}.`}
        </CustomComponentLink>
      </h3>
    </Alert>
  );
};

DuplicatePackagesWarning.propTypes = {
  className: PropTypes.string,
  customComponentLink: PropTypes.elementType,
  duplicatePackagesCount: PropTypes.shape({
    current: PropTypes.number,
    baseline: PropTypes.number,
  }).isRequired,
};

DuplicatePackagesWarning.defaultProps = {
  className: '',
  customComponentLink: ComponentLink,
};
