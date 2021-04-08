import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  PACKAGE_FILTERS,
  PACKAGES_SEPARATOR,
  getBundleModulesBySearch,
  getBundlePackagesByNameComponentLink,
} from '@bundle-stats/utils';
import { getPackagePublicName } from '@bundle-stats/utils/lib-esm/webpack/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { Stack } from '../../layout/stack';
import { FlexStack } from '../../layout/flex-stack';
import { EmptySet } from '../../ui/empty-set';
import { Filters } from '../../ui/filters';
import { Popover } from '../../ui/popover';
import { SortDropdown } from '../../ui/sort-dropdown';
import { Toolbar } from '../../ui/toolbar';
import { ComponentLink } from '../component-link';
import { MetricsTable } from '../metrics-table';
import { MetricsTableSearch } from '../metrics-table-search';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import css from './bundle-packages.module.css';

const getPopoverContent = ({
  packageName,
  packagePath,
  duplicate,
  CustomComponentLink,
}) => {
  const normalizedPackagePath = `node_modules/${packagePath.split(PACKAGES_SEPARATOR).join('/node_modules/')}/`;
  const publicPackageName = getPackagePublicName(packageName);

  return (
    <Stack space="xxsmall" className={css.packagePopover}>
      <h3 className={css.packagePopoverTitle}>{publicPackageName}</h3>
      <ul className={css.packagePopoverList}>
        <li className={css.packagePopoverItem}>
          <a href={`https://www.npmjs.com/package/${publicPackageName}`} target="_blank" rel="noreferrer">
            npmjs.com
          </a>
        </li>
        <li className={css.packagePopoverItem}>
          <a
            href={`https://bundlephobia.com/result?p=${publicPackageName}`}
            target="_blank"
            rel="noreferrer"
          >
            bundlephobia.com
          </a>
        </li>
      </ul>

      <Stack space="xxxsmall" className={css.packagePopover.actions}>
        {duplicate && (
          <div>
            <CustomComponentLink {...getBundlePackagesByNameComponentLink(publicPackageName)}>
              View all duplicate instances
            </CustomComponentLink>
          </div>
        )}

        <CustomComponentLink {...getBundleModulesBySearch(normalizedPackagePath)}>
          View package modules
        </CustomComponentLink>
      </Stack>
    </Stack>
  );
};

export const BundlePackages = (props) => {
  const {
    className,
    jobs,
    items,
    updateFilters,
    resetFilters,
    resetAllFilters,
    totalRowCount,
    filters,
    sortItems,
    sort,
    updateSort,
    search,
    updateSearch,
    hasActiveFilters,
    customComponentLink: CustomComponentLink,
  } = props;

  const emptyMessage = (
    <EmptySet
      resources="packages"
      filtered={totalRowCount !== 0}
      handleResetFilters={resetFilters}
      handleViewAll={resetAllFilters}
    />
  );

  const renderRowHeader = (item) => {
    const packageNames = item.label.split(PACKAGES_SEPARATOR);
    return (
      <>
        {packageNames.map((packageName, index) => {
          // Render duplicate flag only for the last entry
          const duplicateFlag = index === packageNames.length - 1 && item.duplicate && (
            <span className={css.duplicate} title="Duplicate package">
              D
            </span>
          );

          return (
            <Popover className={css.packageName} icon={duplicateFlag} label={packageName}>
              {getPopoverContent({
                packageName,
                packagePath: item.label,
                duplicate: item.duplicate,
                CustomComponentLink,
              })}
            </Popover>
          );
        })}
      </>
    );
  };

  return (
    <section className={cx(css.root, className)}>
      <Toolbar
        className={css.toolbar}
        renderActions={({ actionClassName }) => (
          <FlexStack space="xxsmall" className={cx(css.dropdown, actionClassName)}>
            <SortDropdown items={sortItems} {...sort} onChange={updateSort} />
            <MetricsTableOptions
              handleViewAll={resetAllFilters}
              handleResetFilters={resetFilters}
            />
          </FlexStack>
        )}
      >
        <FlexStack>
          <MetricsTableSearch
            className={css.toolbarSearch}
            placeholder="Search by name"
            search={search}
            updateSearch={updateSearch}
          />
          <Filters
            filters={{
              [PACKAGE_FILTERS.CHANGED]: {
                label: 'Changed',
                defaultValue: filters[PACKAGE_FILTERS.CHANGED],
                disabled: jobs.length <= 1,
              },
              [PACKAGE_FILTERS.DUPLICATE]: {
                label: 'Duplicate',
                defaultValue: filters[PACKAGE_FILTERS.DUPLICATE],
              },
            }}
            label={`Filters (${items.length}/${totalRowCount})`}
            onChange={updateFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </FlexStack>
      </Toolbar>
      <main>
        <MetricsTable
          runs={jobs}
          items={items}
          emptyMessage={emptyMessage}
          renderRowHeader={renderRowHeader}
          showHeaderSum
          title={
            <MetricsTableTitle
              title={I18N.PACKAGES}
              info={`(${items.length}/${totalRowCount})`}
              popoverInfo={I18N.PACKAGES_INFO}
              popoverHref={config.documentation.packages}
            />
          }
        />
      </main>
    </section>
  );
};

BundlePackages.defaultProps = {
  className: '',
  totalRowCount: 0,
  hasActiveFilters: false,
  customComponentLink: ComponentLink,
};

BundlePackages.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
    }),
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      runs: PropTypes.arrayOf(
        PropTypes.shape({
          displayValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          displayDelta: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
      ),
    }),
  ).isRequired,
  updateFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  resetAllFilters: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number,
  filters: PropTypes.shape({
    changed: PropTypes.bool,
  }).isRequired,
  hasActiveFilters: PropTypes.bool,
  sortItems: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      label: PropTypes.string,
      defaultDirection: PropTypes.bool,
    }),
  }).isRequired,
  sort: PropTypes.shape({
    sortBy: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  updateSort: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
  customComponentLink: PropTypes.elementType,
};
