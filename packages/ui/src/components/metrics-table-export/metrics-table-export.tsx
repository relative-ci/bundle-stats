import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import type { ReportMetricRow } from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { Tabs, TabItem } from '../../ui/tabs';
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

const SOURCES = [
  {
    label: 'CSV',
    transformFn: generateSourceCSV,
    extension: 'csv',
  },
  {
    label: 'JSON',
    transformFn: generateSourceJSON,
    extension: 'json',
  },
];

type MetricsTableExportProps = {
  items: Array<ReportMetricRow>;
  download: string;
} & ComponentProps<typeof Stack>;

export const MetricsTableExport = (props: MetricsTableExportProps) => {
  const { items, download, ...restProps } = props;
  const [selectedId, setSelectedId] = useState(SOURCES[0].label);

  return (
    <Stack space="small" {...restProps}>
      <Tabs>
        {SOURCES.map((source, index) => (
          <TabItem
            onClick={() => setSelectedId(source.label)}
            isTabActive={selectedId === source.label}
            id={`metrics-table-export-tab-${index}`}
            aria-controls={`metrics-table-export-panel-${index}`}
            key={source.label}
          >
            {source.label}
          </TabItem>
        ))}
      </Tabs>
      <div>
        {SOURCES.map(
          (source, index) =>
            selectedId === source.label && (
              <PreviewSource
                source={source.transformFn(items)}
                rows={20}
                download={`${download}.${source.extension}`}
                role="tabpanel"
                id={`metrics-table-export-panel-${index}`}
                aria-labelledby={`metrics-table-export-tab-${index}`}
                key={source.label}
              />
          ),
        )}
      </div>
    </Stack>
  );
};
