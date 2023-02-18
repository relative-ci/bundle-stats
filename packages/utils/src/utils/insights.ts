import isEmpty from 'lodash/isEmpty';

import { InsightType, JobInsight, JobInsightsInfo } from '../constants';
import {
  BUNDLE_PACKAGES_DUPLICATE,
  BUNDLE_PACKAGES_CHANGED,
  BUNDLE_PACKAGES_DUPLICATE_CHANGED,
} from './component-links';

interface InsightListItem {
  /**
   * Inight name
   */
  name: string;
  /**
   * Insight data
   */
  insight: JobInsight;
  /**
   * Custom link props
   */
  link: any;
}

/**
 * Get the insigh list ordered by level type
 */
export const getInsightList = (insights: JobInsightsInfo): Array<InsightListItem> => {
  const { duplicatePackages, newPackages } = insights;

  const insightsByLevel: Record<InsightType, Array<InsightListItem>> = {
    [InsightType.ERROR]: [],
    [InsightType.WARNING]: [],
    [InsightType.INFO]: [],
  };

  if (duplicatePackages) {
    insightsByLevel[duplicatePackages.type].push({
      name: 'duplicatePackages',
      insight: duplicatePackages,
      link:
        duplicatePackages.type === InsightType.WARNING
          ? BUNDLE_PACKAGES_DUPLICATE
          : BUNDLE_PACKAGES_DUPLICATE_CHANGED,
    });
  }

  if (newPackages) {
    insightsByLevel[newPackages.type].push({
      name: 'newPackages',
      insight: newPackages,
      link: BUNDLE_PACKAGES_CHANGED,
    });
  }

  return [
    ...(insightsByLevel[InsightType.ERROR] || []),
    ...(insightsByLevel[InsightType.WARNING] || []),
    ...(insightsByLevel[InsightType.INFO] || []),
  ];
};

/**
 * Show only the insights that are introduced by a change
 */
export const getChangedInsights = (normalizedInsights: JobInsightsInfo): JobInsightsInfo | null => {
  const res: JobInsightsInfo = {};

  if (normalizedInsights.duplicatePackages?.type === InsightType.ERROR) {
    res.duplicatePackages = normalizedInsights.duplicatePackages;
  }

  if (normalizedInsights.newPackages) {
    res.newPackages = normalizedInsights.newPackages;
  }

  if (isEmpty(res)) {
    return null;
  }

  return res;
};
