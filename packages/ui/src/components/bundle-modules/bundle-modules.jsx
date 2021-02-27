import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import config from '../../config.json';
import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { EmptySet } from '../../ui/empty-set';
import { FileName } from '../../ui/file-name';
import { Tooltip } from '../../ui/tooltip';
import { Popover } from '../../ui/popover';
import { MetricsTable } from '../../components/metrics-table';
import css from './bundle-modules.module.css';

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
      <Popover
        content={(
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
        )}
      >
        <Icon glyph="help" />
      </Popover>
    </FlexStack>
  );
};


export const BundleModules = ({
  className,
  jobs,
  totalRowCount,
  resetFilters,
  updateSearch,
}) => {
  const items = webpack.compareBySection.allModules(jobs);

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
    <MetricsTable
      className={className}
      items={items}
      runs={jobs}
      renderRowHeader={renderRowHeader.current}
      emptyMessage={emptyMessage}
      showHeaderSum
      title={<Title />}
    />
  );
};

BundleModules.propTypes = {
  /** Adopted child className */
  className: PropTypes.string,

  /* Jobs data */
  jobs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types

  /** total row count */
  totalRowCount: PropTypes.number,

  /** Reset filters handler */
  resetFilters: PropTypes.func.isRequired,

  updateSearch: PropTypes.func.isRequired,
};

BundleModules.defaultProps = {
  className: '',

  totalRowCount: 0,
};
