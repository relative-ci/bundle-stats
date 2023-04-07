import React, { useMemo } from 'react';
import {
  PACKAGES_SEPARATOR,
  PACKAGE_ID_SEPARATOR,
  MetricRunInfo,
  getBundleModulesBySearch,
  getBundlePackagesByNameComponentLink,
} from '@bundle-stats/utils';
import { Package } from '@bundle-stats/utils/types/webpack';

import { Stack } from '../../layout/stack';
import { ComponentLink } from '../component-link';
import { FileName } from '../../ui/file-name';
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
  } = props;

  const fallbackPackagePath = `node_modules/${item.label.split(PACKAGES_SEPARATOR).join('/node_modules/')}`;
  const normalizedPackagePath = `${item.runs?.[0]?.path || fallbackPackagePath}/`;
  const [normalizedName] = name.split(PACKAGE_ID_SEPARATOR);

  const packageItem = useMemo(
    () => ({
      ...item,
      label: name,
    }),
    [item, name],
  );

  return (
    <EntryInfo item={packageItem} labels={labels} runNameSelector="path" className={className}>
      <p>Path: <FileName name={normalizedPackagePath} className={css.fileName} /></p>
      <Stack space="xxxsmall" className={css.packageHoverCardActions}>
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
      <ul className={css.external}>
        <li className={css.externalItem}>
          <a
            href={`https://www.npmjs.com/package/${normalizedName}`}
            target="_blank"
            rel="noreferrer"
            className={css.externalLink}
          >
            npmjs.com
          </a>
        </li>
        <li className={css.externalItem}>
          <a
            href={`https://bundlephobia.com/result?p=${normalizedName}`}
            target="_blank"
            rel="noreferrer"
            className={css.externalLink}
          >
            bundlephobia.com
          </a>
        </li>
      </ul>

    </EntryInfo>
  );
};
