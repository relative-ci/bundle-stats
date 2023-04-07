import React from 'react';
import cx from 'classnames';
import type { Asset } from '@bundle-stats/utils/types/webpack';

import { Stack } from '../../layout/stack';
import { Table } from '../../ui/table';
import css from './asset-not-predictive.module.css';

interface AssetNotPredictiveProps {
  runs?: Array<Asset>;
  labels?: Array<string>
}

export const AssetNotPredictive = (props: AssetNotPredictiveProps & React.ComponentProps<'div'>) => {
  const { className = '', runs = null, labels = null, ...restProps } = props;

  return (
    <Stack space="xsmall" {...restProps} className={cx(css.root, className)}>
      <p className={css.text}>
        Asset file name is the same, but the size has changed.
      </p>
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
