import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import type { ReportMetricRow } from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { Tabs, TabItem } from '../../ui/tabs';
import { PreviewSource } from '../preview-source';
import css from './metrics-table-export.module.css';

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

const SOURCES = {
  csv: {
    label: 'CSV',
    transformFn: generateSourceCSV,
    extension: '.csv',
  },
  json: {
    label: 'JSON',
    transformFn: generateSourceJSON,
    extension: '.json',
  },
};

const SOURCE_ENTRIES = Object.entries(SOURCES);
const SOURCE_KEYS = Object.keys(SOURCES);

type MetricsTableExportProps = {
  items: Array<ReportMetricRow>;
  initialSourceType?: string;
  download: string;
} & ComponentProps<typeof Stack>;

export const MetricsTableExport = (props: MetricsTableExportProps) => {
  const { initialSourceType = SOURCE_KEYS[0], items, download, ...restProps } = props;

  const [selectedSourceType, setSelectedSourceType] = useState(initialSourceType);

  return (
    <Stack space="small" {...restProps}>
      <Tabs className={css.tabs}>
        {SOURCE_ENTRIES.map(([sourceId, source]) => (
          <TabItem
            onClick={() => setSelectedSourceType(sourceId)}
            isTabActive={selectedSourceType === sourceId}
            id={`metrics-table-export-tab-${sourceId}`}
            aria-controls={`metrics-table-export-panel-${sourceId}`}
            key={sourceId}
          >
            {source.label}
          </TabItem>
        ))}
      </Tabs>
      <div>
        {SOURCE_ENTRIES.map(
          ([sourceId, source]) =>
            selectedSourceType === sourceId && (
              <PreviewSource
                source={source.transformFn(items)}
                rows={20}
                download={`${download}${source.extension}`}
                role="tabpanel"
                id={`metrics-table-export-panel-${sourceId}`}
                aria-labelledby={`metrics-table-export-tab-${sourceId}`}
                key={source.label}
              />
          ),
        )}
      </div>
    </Stack>
  );
};
