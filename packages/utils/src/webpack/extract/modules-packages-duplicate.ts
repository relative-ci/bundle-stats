import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import sum from 'lodash/sum';

import {
  InsightType,
  Job,
  JobInsight,
  JobInsightDuplicatePackagesData,
  JobInsightDuplicatePackagesV3Data,
  JobInsights,
  MetricRun,
} from '../../constants';
import { Packages } from '../types';

interface DuplicatePackage {
  id: string;
  value: number;
}

interface DuplicatePackageGroup {
  name: string;
  value: number;
  children: Array<DuplicatePackage>;
}

interface ModulesPackagesDuplicateData {
  insights?: {
    duplicatePackages?: JobInsights['webpack']['duplicatePackages'];
    duplicatePackagesV3?: JobInsights['webpack']['duplicatePackagesV3'];
  };
  metrics: {
    duplicatePackagesCount: MetricRun;
  };
}

export const getDuplicatePackagesInsight = (
  duplicatePackagesMap: Record<string, Array<string>>,
  baselineDuplicatePackagesMap?: Record<string, Array<string>>,
): JobInsight<JobInsightDuplicatePackagesV3Data> | null => {
  const duplicateInstances: Array<string> = [];
  const baselineDuplicateInstances: Array<string> = [];
  const newDuplicateInstances: Array<string> = [];
  const removedDuplicateInstances: Array<string> = [];

  Object.entries(duplicatePackagesMap).forEach(([id, instances]) => {
    instances.forEach((duplicateInstance) => {
      if (duplicateInstance === id) {
        return;
      }

      duplicateInstances.push(duplicateInstance);

      if (baselineDuplicatePackagesMap?.[id]?.includes(duplicateInstance)) {
        return;
      }

      newDuplicateInstances.push(duplicateInstance);
    });
  });

  if (baselineDuplicatePackagesMap) {
    Object.entries(baselineDuplicatePackagesMap).forEach(([id, instances]) => {
      instances.forEach((duplicateInstance) => {
        if (duplicateInstance === id) {
          return;
        }

        baselineDuplicateInstances.push(duplicateInstance);

        if (duplicatePackagesMap?.[id]?.includes(duplicateInstance)) {
          return;
        }

        removedDuplicateInstances.push(duplicateInstance);
      });
    });
  }

  const duplicateInstancesCount = duplicateInstances.length;
  const newDuplicateInstancesCount = newDuplicateInstances.length;
  const removedDuplicateInstancesCount = removedDuplicateInstances.length;

  let text = '';
  let insightType: InsightType | null = null;

  if (newDuplicateInstancesCount > 0 && removedDuplicateInstancesCount > 0) {
    // New duplicate packages and removed duplicates
    const item =
      newDuplicateInstancesCount > 1 || removedDuplicateInstancesCount > 1 ? 'packages' : 'package';
    text = `Bundle introduced ${newDuplicateInstancesCount} and removed ${removedDuplicateInstancesCount} duplicate ${item}`;
    insightType = InsightType.ERROR;
  } else if (newDuplicateInstancesCount > 0 && !isEmpty(baselineDuplicatePackagesMap)) {
    // New duplicate packages and baseline comparison
    const item = newDuplicateInstancesCount > 1 ? 'packages' : 'package';
    text = `Bundle introduced ${newDuplicateInstancesCount} duplicate ${item}`;
    insightType = InsightType.ERROR;
  } else if (newDuplicateInstancesCount > 0) {
    // New duplicate packages and no baseline
    const item = newDuplicateInstancesCount > 1 ? 'packages' : 'package';
    text = `Bundle contains ${newDuplicateInstancesCount} duplicate ${item}`;
    insightType = InsightType.WARNING;
  } else if (removedDuplicateInstancesCount > 0 && duplicateInstancesCount > 0) {
    // Removed duplicate packages, but there are duplicate packages remaining
    const itemRemoved = removedDuplicateInstancesCount > 1 ? 'packages' : 'package';
    const itemRemaining = duplicateInstancesCount > 1 ? 'packages' : 'package';
    text = `Bundle removed ${removedDuplicateInstancesCount} duplicate ${itemRemoved}, ${duplicateInstancesCount} duplicate ${itemRemaining} remaining`;
    insightType = InsightType.WARNING;
  } else if (removedDuplicateInstancesCount > 0) {
    // Removed duplicate packages
    const item = removedDuplicateInstancesCount > 1 ? 'packages' : 'package';
    text = `Bundle removed ${removedDuplicateInstancesCount} duplicate ${item}`;
    insightType = InsightType.INFO;
  } else if (
    newDuplicateInstancesCount === 0 &&
    removedDuplicateInstancesCount === 0 &&
    duplicateInstancesCount > 0
  ) {
    // No change comparred with the baseline
    const item = duplicateInstancesCount > 1 ? 'packages' : 'package';
    text = `Bundle contains ${duplicateInstancesCount} duplicate ${item}`;
    insightType = InsightType.WARNING;
  } else {
    // No change - noop
  }

  if (!text || !insightType) {
    return null;
  }

  return {
    type: insightType,
    data: {
      text,
      packages: duplicatePackagesMap,
    },
  };
};

export const extractModulesPackagesDuplicate = (
  _: any,
  currentExtractedData: any,
  baselineJob?: Job,
): ModulesPackagesDuplicateData => {
  const source: Packages = currentExtractedData?.metrics?.packages || {};

  // Group packages by name(uniq)
  const packagesByName: Record<string, DuplicatePackageGroup> = {};

  Object.entries(source).forEach(([packageId, packageData]) => {
    const { name, value } = packageData;
    const existingPackageData: DuplicatePackageGroup = packagesByName[name] || {
      name,
      value,
      children: [],
    };

    existingPackageData.children.push({ id: packageId, value });

    packagesByName[name] = existingPackageData;
  });

  // Filter, count and sum the duplicate packages
  let count = 0;
  const duplicatePackages: Array<DuplicatePackageGroup> = [];

  Object.entries(packagesByName).forEach(([packageGroupName, packageGroupData]) => {
    // Count duplicate instances (substract the initial instance)
    // example: package-a, package-b:package-a -> duplicateInstances = 1
    const duplicateInstances = packageGroupData.children.length - 1;

    // No duplicates, skip
    if (duplicateInstances === 0) {
      return;
    }

    count += duplicateInstances;

    duplicatePackages.push({
      name: packageGroupName,
      value: sum(map(packageGroupData.children, 'value')),
      children: packageGroupData.children,
    });
  });

  const baselineDuplicatePackages =
    baselineJob?.insights?.webpack?.duplicatePackagesV3?.data?.packages ||
    baselineJob?.insights?.webpack?.duplicatePackages?.data ||
    {};

  const noDuplicatesDuplicatePackagesV3 = getDuplicatePackagesInsight({}, baselineDuplicatePackages);

  if (!count) {
    return {
      ...(noDuplicatesDuplicatePackagesV3 && {
        insights: {
          duplicatePackagesV3: noDuplicatesDuplicatePackagesV3,
        },
      }),
      metrics: {
        duplicatePackagesCount: {
          value: count,
        },
      },
    };
  }

  // Group duplicate packages by name and order children by value
  const duplicatePackagesByName: Record<string, DuplicatePackageGroup> = orderBy(
    duplicatePackages,
    'value',
    'desc',
  ).reduce(
    (agg, { name, ...duplicatePackageData }: DuplicatePackageGroup) => ({
      ...agg,
      [name]: {
        ...duplicatePackageData,
        children: orderBy(duplicatePackageData.children, 'value', 'desc'),
      },
    }),
    {},
  );

  // Generate v2 data structure
  // @TODO remove in v5.0
  const duplicatePackagesData: JobInsightDuplicatePackagesData = {};

  Object.entries(duplicatePackagesByName).forEach(([packageName, packageData]) => {
    if (!duplicatePackagesData[packageName]) {
      duplicatePackagesData[packageName] = [];
    }

    duplicatePackagesData[packageName] = packageData.children.map(({ id }) => id);
  });

  const duplicatePackagesV3 = getDuplicatePackagesInsight(
    duplicatePackagesData,
    baselineDuplicatePackages,
  );

  return {
    insights: {
      duplicatePackages: {
        type: InsightType.WARNING,
        data: duplicatePackagesData,
      },
      ...(duplicatePackagesV3 && { duplicatePackagesV3 }),
    },
    metrics: {
      duplicatePackagesCount: {
        value: count,
      },
    },
  };
};
