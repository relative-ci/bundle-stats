import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { getBundleAssetsFileTypeComponentLink } from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { ASSETS_SIZES_FILE_TYPE_MAP } from '../../constants';
import { FlexStack } from '../../layout/flex-stack';
import { MetricsTable } from '../metrics-table';
import { ComponentLink } from '../component-link';
import { BudgetInfo } from '../budget-info';
import css from './bundle-assets-totals-table.module.css';

export const BundleAssetsTotalsTable = ({
  className,
  jobs,
  customComponentLink: CustomComponentLink,
}) => {
  const items = useMemo(() => webpack.compareBySection.sizes(jobs), [jobs]);
  const budgets = jobs[0].insights?.webpack?.budgets;

  const renderRowHeader = useCallback(
    (item) => {
      const fileType = ASSETS_SIZES_FILE_TYPE_MAP[item.key];
      const { section, title, params } = getBundleAssetsFileTypeComponentLink(fileType, item.label);
      const [_, ...metricSlugs] = item.key.split('.');
      const metricKey = metricSlugs.join('.');
      const budget = get(budgets, metricKey);

      return (
        <CustomComponentLink section={section} title={title} params={params}>
          <FlexStack space="xxsmall" className={css.itemTitleText}>
            <span>{item.label}</span>
            {budget && <BudgetInfo metricId={item.key} budgetInsight={budget} />}
          </FlexStack>
        </CustomComponentLink>
      );
    },
    [CustomComponentLink],
  );

  return (
    <MetricsTable
      className={className}
      runs={jobs}
      items={items}
      renderRowHeader={renderRowHeader}
      showHeaderSum
    />
  );
};

BundleAssetsTotalsTable.defaultProps = {
  className: '',
  jobs: [],
  customComponentLink: ComponentLink,
};

BundleAssetsTotalsTable.propTypes = {
  /** Addopted child class name */
  className: PropTypes.string,

  /** Jobs data */
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  customComponentLink: PropTypes.elementType,
};
