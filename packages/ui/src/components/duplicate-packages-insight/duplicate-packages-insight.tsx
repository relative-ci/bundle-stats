import React from 'react';
import {
  BUNDLE_PACKAGES_DUPLICATE,
  BUNDLE_PACKAGES_DUPLICATE_NEW,
  BUNDLE_PACKAGES_COUNT,
  InsightType,
  JobSummaryItem,
  getMetricRunInfo,
  JobInsightDuplicatePackagesV3Data,
  getGlobalMetricType,
} from '@bundle-stats/utils';

import { Alert } from '../../ui/alert';
import { ComponentLink } from '../component-link';
import { Delta } from '../delta';
// @ts-ignore
import css from './duplicate-packages-insight.module.css';

interface DuplicatePackagesInsightProps extends React.HTMLAttributes<HTMLDivElement> {
  type: InsightType;
  data: JobInsightDuplicatePackagesV3Data;
  summary: JobSummaryItem;
  showDelta?: boolean;
  customComponentLink?: React.FunctionComponent<React.HTMLAttributes<HTMLLinkElement>>;
}

const AlertKindMap = new Map([
  [InsightType.INFO, 'info'],
  [InsightType.ERROR, 'danger'],
  [InsightType.WARNING, 'warning'],
]);

export const DuplicatePackagesInsight = (props: DuplicatePackagesInsightProps) => {
  const {
    type,
    data,
    summary,
    showDelta = true,
    customComponentLink: CustomComponentLink = ComponentLink,
    ...restProps
  } = props;

  const metric = getGlobalMetricType('webpack.duplicatePackageCount');

  const metricRunInfo = getMetricRunInfo(metric, summary.current, summary.baseline);

  const hasDuplicatePackages =
    metricRunInfo.value > 0 || (metricRunInfo && metricRunInfo.delta !== 0);

  return (
    <Alert kind={AlertKindMap.get(type)} {...restProps}>
      <span className={css.message}>{data.text}</span>
      {hasDuplicatePackages && (
        <span className={css.metric}>
          {metricRunInfo.value}
          {showDelta && typeof metricRunInfo.delta !== 'undefined' && (
            <Delta
              className={css.delta}
              inverted
              displayValue={metricRunInfo.displayDelta as string}
              deltaType={metricRunInfo.deltaType as string}
            />
          )}
        </span>
      )}
      <span className={css.link}>
        {hasDuplicatePackages &&
          (typeof metricRunInfo?.delta !== 'undefined' && metricRunInfo.delta !== 0 ? (
            <CustomComponentLink {...(BUNDLE_PACKAGES_DUPLICATE_NEW as any)}>
              View duplicate packages
            </CustomComponentLink>
          ) : (
            <CustomComponentLink {...(BUNDLE_PACKAGES_DUPLICATE as any)}>
              View duplicate packages
            </CustomComponentLink>
          ))}

        {!hasDuplicatePackages && (
          <CustomComponentLink {...(BUNDLE_PACKAGES_COUNT as any)}>
            View packages
          </CustomComponentLink>
        )}
      </span>
    </Alert>
  );
};
