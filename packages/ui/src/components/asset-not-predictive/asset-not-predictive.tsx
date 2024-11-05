import type { ComponentProps } from 'react';
import React from 'react';
import cx from 'classnames';
import type { AssetMetricRun } from '@bundle-stats/utils/types/webpack';

import { Stack } from '../../layout/stack';
import { Table } from '../../ui/table';
import css from './asset-not-predictive.module.css';

export type AssetNotPredictiveProps = {
  runs?: Array<AssetMetricRun>;
  labels?: Array<string>;
} & ComponentProps<'div'>;

export const AssetNotPredictive = (props: AssetNotPredictiveProps) => {
  const { className = '', runs = null, labels = null, ...restProps } = props;

  return (
    <Stack space="small" {...restProps} className={cx(css.root, className)}>
      <Stack space="xxxsmall">
        <h3>Asset hash is not predictive</h3>
        <p className={css.text}>File names are equal, but the size is different.</p>
      </Stack>
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
                <Table.Td>{name}</Table.Td>
                <Table.Td className={css.tableValue}>{value}</Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      )}
    </Stack>
  );
};
