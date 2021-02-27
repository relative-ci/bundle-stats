import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get, map } from 'lodash';

import config from '../../config.json';
import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { EmptySet } from '../../ui/empty-set';
import { FileName } from '../../ui/file-name';
import { FiltersDropdown } from '../../ui/filters-dropdown';
import { Popover } from '../../ui/popover';
import { SortDropdown } from '../../ui/sort-dropdown';
import { Toolbar } from '../../ui/toolbar';
import { Tooltip } from '../../ui/tooltip';
import { MetricsTable } from '../metrics-table';
import { MetricsTableSearch } from '../metrics-table-search';
import css from './bundle-modules.module.css';
import {MODULE_FILTER_CHANGED, MODULE_FILTER_CHUNKS} from './bundle-modules.constants';

const getRenderRowHeader = (labels) => (row) => (
  <Tooltip
    title={
      <div className={css.nameTooltip}>
        {row.runs.map((run, index) => {
          const key = index;

          return (
            <div className={css.nameTooltipItem} key={key}>
              <h5 className={css.nameTooltipTitle}>{labels[index]}</h5>
              <FileName className={css.nameTooltipText} name={run && run.name ? run.name : '-'} />
            </div>
          );
        })}
      </div>
    }
  >
    <FileName className={css.name} name={row.label} />
  </Tooltip>
);

const Title = () => {
  return (
    <FlexStack space="xxxsmall" className={css.title}>
      <span>{I18N.MODULES}</span>
      <Popover icon="help">
        <Stack space="xxxsmall">
          <p>{I18N.MODULES_INFO}</p>
          <p>
            <a
              href={config.documentation.modules}
              target="_blank"
              rel="noreferrer"
            >
              {I18N.READ_MORE}
            </a>
          </p>
        </Stack>
      </Popover>
    </FlexStack>
  );
};

export const BundleModules = ({
  className,
  jobs,
  items,
  chunks,
  totalRowCount,
  updateFilters,
  resetFilters,
  filters,
  sortItems,
  sort,
  updateSort,
  search,
  updateSearch,
  hasActiveFilters,
}) => {
  const rootClassName = cx(css.root, className);

  const clearSearch = () => {
    resetFilters();
    updateSearch('');
  };

  const renderRowHeader = useMemo(() => getRenderRowHeader(map(jobs, 'label')), []);
  const emptyMessage = useMemo(
    () => (
      <EmptySet resources="modules" filtered={totalRowCount !== 0} resetFilters={clearSearch} />
    ),
    [],
  );

  return (
    <div className={rootClassName}>
      <Toolbar
        className={css.toolbar}
        renderActions={({ actionClassName }) => (
          <>
            <div className={actionClassName}>
              <SortDropdown
                className={css.tableDropdown}
                items={sortItems}
                onChange={updateSort}
                {...sort}
              />
            </div>
            <div className={actionClassName}>
              <FiltersDropdown
                className={css.tableDropdown}
                filters={{
                  [MODULE_FILTER_CHANGED]: {
                    label: 'Changed',
                    defaultValue: filters.changed,
                    disabled: jobs.length <= 1,
                  },
                  [MODULE_FILTER_CHUNKS]: {
                    label: 'Chunks',
                    ...chunks.reduce((agg, { id, name }) => ({
                      ...agg,
                      [id]: {
                        label: name,
                        defaultValue: get(filters, `${MODULE_FILTER_CHUNKS}.${id}`, true),
                      }
                    }), {})
                  },
                }}
                label={`Filters (${items.length}/${totalRowCount})`}
                onChange={updateFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </>
        )}
      >
        <MetricsTableSearch
          className={css.toolbarSearch}
          search={search}
          updateSearch={updateSearch}
          placeholder="Search by name"
        />
      </Toolbar>
      <MetricsTable
        className={css.table}
        items={items}
        runs={jobs}
        renderRowHeader={renderRowHeader.current}
        emptyMessage={emptyMessage}
        showHeaderSum
        title={<Title />}
      />
    </div>
  );
};

BundleModules.defaultProps = {
  className: '',
  items: [],
  jobs: [],
  totalRowCount: 0,
  hasActiveFilters: false,
};

BundleModules.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Rows data */
  items: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** Jobs data */
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** Chunks data */
  chunks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,

  /** total row count */
  totalRowCount: PropTypes.number,

  /** Update filters handler */
  updateFilters: PropTypes.func.isRequired,

  /** Reset filters handler */
  resetFilters: PropTypes.func.isRequired,

  /** Filters data */
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
};
