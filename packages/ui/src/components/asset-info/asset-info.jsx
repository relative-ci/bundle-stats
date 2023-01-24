import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { METRIC_TYPES, getBundleModulesByChunk, getModuleFileType, getMetricRunInfo } from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { Separator } from '../../layout/separator';
import { FileName } from '../../ui/file-name';
import { ComponentLink } from '../component-link';
import { SummaryItem } from '../summary-item';
import css from './asset-info.module.css';
import { Metric } from '../metric';
import { Delta } from '../delta';

const ChunkModulesLink = ({ as: Component, chunks, chunkId, name }) => {
  const chunk = chunks?.find(({ id }) => id === chunkId );

  if (!chunk) {
    return null;
  }

  const chunkIds = chunks?.map(({ id }) => id);
  const fileType = getModuleFileType(name);

  return (
    <Component
      className={css.viewModules}
      {...getBundleModulesByChunk(chunkIds, chunkId, fileType)}
    >
      View chunk modules
    </Component>
  );
};

ChunkModulesLink.propTypes = {
  as: PropTypes.elementType.isRequired,
  chunks: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  chunkId: PropTypes.string,
  name: PropTypes.string,
};

ChunkModulesLink.defaultProps = {
  chunks: [],
  chunkId: '',
  name: '',
};

export const AssetInfo = (props) => {
  const { className, chunks, item, labels, CustomComponentLink } = props;

  const summaryItem = useMemo(() => {
    const current = item.runs[0]?.value;
    const baseline = item.runs.length > 1 ? item.runs[item.runs.length - 1]?.value : 0;
    const metricRunInfo = getMetricRunInfo(METRIC_TYPES.METRIC_TYPE_FILE_SIZE, current, baseline);

    return {
      current,
      baseline,
      metricRunInfo,
    };
  }, [item]);

  return (
    <Stack space="xsmall" className={cx(css.root, className)}>
      <Stack space="xxxsmall">
      <h3 className={css.title}>{item.key}</h3>
        <Metric value={summaryItem.current} formatter={METRIC_TYPES.METRIC_TYPE_FILE_SIZE.formatter} inline>
          <Delta displayValue={summaryItem.metricRunInfo.displayDeltaPercentage} />
        </Metric>
        <Metric value={summaryItem.baseline} formatter={METRIC_TYPES.METRIC_TYPE_FILE_SIZE.formatter} />
      </Stack>

      <Separator />
      {item.runs.map((run, index) => {
        const Title = index !== 0 ? 'h4' : 'h3';
        const key = `asset-info-${run?.name || index}-${index}`;

        return (
          <Stack space="xxxsmall" key={key}>
            <Title>{labels[index]}</Title>
            <FileName
              className={css.fileName}
              as='code'
              name={run?.name || '-'}
            />

            {index === 0 && (
              <ChunkModulesLink
                as={CustomComponentLink}
                chunks={chunks}
                chunkId={run?.chunkId}
                name={run?.name}
              />
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};

AssetInfo.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    runs: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        chunkId: PropTypes.string,
      }),
    ),
  }).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chunks: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  CustomComponentLink: PropTypes.elementType,
};

AssetInfo.defaultProps = {
  className: '',
  chunks: [],
  CustomComponentLink: ComponentLink,
};
