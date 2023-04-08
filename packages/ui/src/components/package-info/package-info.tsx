import React, { useMemo } from 'react';
import noop from 'lodash/noop';
import {
  BUNDLE_PACKAGES_DUPLICATE,
  PACKAGES_SEPARATOR,
  PACKAGE_ID_SEPARATOR,
  MetricRunInfo,
  getBundleModulesBySearch,
  getBundlePackagesByNameComponentLink,
} from '@bundle-stats/utils';
import { Package } from '@bundle-stats/utils/types/webpack';

import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { ComponentLink } from '../component-link';
import { FileName } from '../../ui/file-name';
import { Tag } from '../../ui/tag';
import { EntryInfo } from '../entry-info';
import css from './package-info.module.css';

interface PackageInfoProps {
  name: string;
  item: {
    label: string;
    duplicate?: boolean;
    runs: Array<Package & MetricRunInfo>;
  };
  labels: Array<string>;
  customComponentLink?: React.ElementType;
}

export const PackageInfo = (props: PackageInfoProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    name,
    item,
    labels,
    customComponentLink: CustomComponentLink = ComponentLink,
    onClick = noop
  } = props;

  const fallbackPackagePath = `node_modules/${item.label.split(PACKAGES_SEPARATOR).join('/node_modules/')}`;
  const normalizedPackagePath = `${item.runs?.[0]?.path || fallbackPackagePath}/`;
  const [normalizedName, packageId] = name.split(PACKAGE_ID_SEPARATOR);

  const packageTitle = useMemo(() => (
    <span className={css.packageTitle}>
      <span className={css.packageTitleText}>{normalizedName}</span>
      {packageId && <span className={css.packageTitleId}>{PACKAGE_ID_SEPARATOR}{packageId}</span>}
    </span>
  ), [normalizedName, packageId]);

  const tags = useMemo(() => {
    if (!item.duplicate) {
      return null;
    }

    return (
      <div>
        <Tag as={CustomComponentLink} {...BUNDLE_PACKAGES_DUPLICATE} onClick={onClick} kind="danger">Duplicate</Tag>
      </div>
    );
  }, [item]);

  return (
    <EntryInfo
      itemTitle={packageTitle}
      item={item}
      labels={labels}
      tags={tags}
      runNameSelector="path"
      className={className}
    >
      <Stack space="small">
        <p>Path: <FileName name={normalizedPackagePath} className={css.fileName} /></p>

        <Stack space="xxxsmall">
          {item.duplicate && (
            <div>
              <CustomComponentLink {...getBundlePackagesByNameComponentLink(normalizedName)}>
                View all duplicate instances
              </CustomComponentLink>
            </div>
          )}

          <CustomComponentLink {...getBundleModulesBySearch(normalizedPackagePath)}>
            Search modules by package path
          </CustomComponentLink>
        </Stack>

        <FlexStack space="xsmall" alignItems="center" className={css.external}>
          <a
            href={`https://www.npmjs.com/package/${normalizedName}`}
            target="_blank"
            rel="noreferrer"
            className={css.externalLink}
          >
            npmjs.com
          </a>
          <a
            href={`https://bundlephobia.com/result?p=${normalizedName}`}
            target="_blank"
            rel="noreferrer"
            className={css.externalLink}
          >
            bundlephobia.com
          </a>
        </FlexStack>
      </Stack>
    </EntryInfo>
  );
};
