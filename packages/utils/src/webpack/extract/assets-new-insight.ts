import { InsightType, Job, JobInsights } from '../../constants';
import { Assets } from '../types';

const getAssetNames = (assets: Assets) => new Set(Object.keys(assets));

interface AssetsNewInsight {
  insights?: {
    newAssets: JobInsights['webpack']['newAssets'];
  };
}

export const extractAssetsNewInsight = (
  _: any,
  currentExtractedData: any,
  baselineJob?: Job,
): AssetsNewInsight | null => {
  const currentAssets = currentExtractedData.metrics?.assets as Assets;
  const baselineAssets =  baselineJob?.metrics?.webpack?.assets as Assets;

  if (!baselineAssets) {
    return null;
  }

  const currentAssetNames = getAssetNames(currentAssets);
  const baselineAssetNames = getAssetNames(baselineAssets);

  const newAssets: Array<string> = [];
  currentAssetNames.forEach((assetName) => {
    if (!baselineAssetNames.has(assetName)) {
      newAssets.push(assetName);
    }
  });

  if (newAssets.length === 0) {
    return null;
  }

  const text = `Bundle introduced ${newAssets.length > 1 ? `${newAssets.length} new assets` : 'one new asset' }`;

  return {
    insights: {
      newAssets: {
        type: InsightType.WARNING,
        data: {
          text,
          assets: newAssets,
        },
      },
    },
  };
};
