import { InsightType, Job, JobInsights } from '../../constants';
import { Packages } from '../types';

interface ModulesPackagesNewData {
  insights?: {
    newPackages: JobInsights['webpack']['newPackages'];
  };
}

const getPackageNames = (packages: Packages): Set<string> => {
  const result: Set<string> = new Set();

  Object.values(packages).forEach((metricPackage) => {
    result.add(metricPackage.name);
  });

  return result;
};

const getText = (newPackages: Array<string>) => {
  if (newPackages.length === 1) {
    return `Bundle introduced one new package: ${newPackages[0]}`;
  }

  const firstNewPackages = newPackages.slice(0, 3);
  const otherPackages = newPackages.slice(3);

  const text = `Bundle introduced ${newPackages.length} new packages: ${firstNewPackages.join(', ')}`;

  if (otherPackages.length === 0) {
    return text;
  }

  if (otherPackages.length === 1) {
    return `${text} and one more`;
  }

  return `${text} and ${otherPackages.length} more`;
};

export const extractModulesPackagesNewInsight = (
  _: any,
  currentExtractedData: any,
  baselineJob?: Job,
): ModulesPackagesNewData | null => {
  const currentMetricPackages = currentExtractedData?.metrics?.packages as Packages;
  const baselineMetricPackages = baselineJob?.metrics?.webpack?.packages as Packages;

  // Skip insight when the baseline data is missing
  if (!baselineMetricPackages) {
    return null;
  }

  const currentPackages = getPackageNames(currentMetricPackages);
  const baselinePackages = getPackageNames(baselineMetricPackages);

  const newPackages: Array<string> = [];

  currentPackages.forEach((packageName) => {
    if (!baselinePackages.has(packageName)) {
      newPackages.push(packageName);
    }
  });

  if (newPackages.length === 0) {
    return null;
  }

  return {
    insights: {
      newPackages: {
        type: InsightType.WARNING,
        data: {
          text: getText(newPackages),
          packages: newPackages,
        },
      },
    },
  };
};
