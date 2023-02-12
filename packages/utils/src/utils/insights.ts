import { InsightType, JobInsight, JobInsights } from '../constants';
import {
  BUNDLE_PACKAGES_DUPLICATE,
  BUNDLE_PACKAGES_CHANGED,
  BUNDLE_PACKAGES_DUPLICATE_CHANGED,
} from './component-links';

interface InsightEntry {
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
export const getInsightList = (insights: Partial<JobInsights['webpack']>): Array<InsightEntry> => {
  const { duplicatePackages, newPackages } = insights;

  const insightsByLevel: Record<InsightType, Array<InsightEntry>> = {
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
