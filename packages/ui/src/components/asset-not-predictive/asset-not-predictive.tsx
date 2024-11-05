import type { ComponentProps } from 'react';
import React from 'react';
import cx from 'classnames';
import type { AssetMetricRun } from '@bundle-stats/utils/types/webpack';

import { Stack } from '../../layout/stack';
import { Table } from '../../ui/table';
import css from './asset-not-predictive.module.css';
import { Alert } from '../../ui';

export type AssetNotPredictiveProps = {
  runs?: Array<AssetMetricRun>;
  labels?: Array<string>;
} & ComponentProps<'div'>;

export const AssetNotPredictive = (props: AssetNotPredictiveProps) => {
  const { className = '', runs = null, labels = null, ...restProps } = props;

  return (
    <Stack space="small" {...restProps} className={cx(css.root, className)}>
      <h3>Asset hash is not predictive</h3>
      <Alert kind="warning">
        File names are identical, but the size is different. Content changes without a hash change
        can cause runtime errors.
      </Alert>
      {runs && (
        <Table outline compact>
          <Table.THead>
            <Table.Tr>
              <Table.Th>&nbsp;</Table.Th>
              <Table.Th>File name</Table.Th>
              <Table.Th className={css.tableValue}>Size</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {runs.map(({ name, value }, index) => (
              <Table.Tr key={name}>
                <Table.Th>{labels?.[index]}</Table.Th>
                <Table.Td className={css.colName}>{name}</Table.Td>
                <Table.Td className={css.colvalue}>{value}</Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      )}
    </Stack>
  );
};
