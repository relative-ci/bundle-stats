import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import type { ReportMetricRow } from '@bundle-stats/utils';

import { useTabState } from 'ariakit';
import { Stack } from '../../layout/stack';
import { Tabs } from '../../ui/tabs';
import { PreviewSource } from '../preview-source';

const generateSourceJSON = (items: Array<ReportMetricRow>): string => {
  const output = items.map((item) => ({
    name: item.label,
    runs: item.runs?.map((itemRun) => ({
      name: itemRun?.name || '',
      size: itemRun?.value || 0,
    })),
  }));

  return JSON.stringify(output, null, 2);
};

const CSV_SEPARATOR = ', ';

const generateSourceCSV = (items: Array<ReportMetricRow>): string => {
  const output = [];

  output.push(
    [
      'Name',
      ...(items?.[0]?.runs?.map((_, index) => {
        if (index === 0) {
          return `Run ${index + 1}(current)`;
        }

        return `Run ${index + 1}(baseline)`;
      }) || []),
    ].join(CSV_SEPARATOR),
  );

  items?.forEach((item) => {
    const row: Array<string | number> = [item.label];

    item.runs?.forEach((itemRun) => {
      row.push(itemRun?.value || 0);
    });

    output.push(row.join(CSV_SEPARATOR));
  });

  return output.join('\r');
};

type MetricsTableExportProps = {
  items: Array<ReportMetricRow>;
  download: string;
} & ComponentProps<typeof Stack>;

export const MetricsTableExport = (props: MetricsTableExportProps) => {
  const { items, download, ...restProps } = props;
  const [selectedId, setSelectedId] = useState('CSV');

  return (
    <Stack space="small" {...restProps}>
      <Tabs>
        <Tabs.Item onClick={() => setSelectedId('CSV')} isTabActive={selectedId === 'CSV'}>
          CSV
        </Tabs.Item>
        <Tabs.Item onClick={() => setSelectedId('JSON')} isTabActive={selectedId === 'JSON'}>
          JSON
        </Tabs.Item>
      </Tabs>
      {selectedId === 'CSV' && (
        <PreviewSource source={generateSourceCSV(items)} download={`${download}.csv`} />
      )}
      {selectedId === 'JSON' && (
        <PreviewSource source={generateSourceJSON(items)} download={`${download}.json`} />
      )}
    </Stack>
  );
};
