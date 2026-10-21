import React from 'react';
import cx from 'classnames';
import type { MetricRunInfo } from '@bundle-stats/utils';

import css from './tile-group-title.module.css';

interface TileGroupTitleContentProps {
  title?: string;
  runInfo?: MetricRunInfo;
}

const TileGroupTitleContent = (props: TileGroupTitleContentProps) => {
  const { title, runInfo } = props;

  return (
    <div className={css.tileGroupTitleContent}>
      {title && <span className={css.tileGroupTitleText}>{title}</span>}
      {runInfo && (
        <span className={css.tileGroupTitleTotal}>
          {runInfo.displayValue}
          {'displayDelta' in runInfo && `(${runInfo.displayDeltaPercentage})`}
        </span>
      )}
    </div>
  );
};

export type TileGroupTitleProps = TileGroupTitleContentProps & {
  /**
   * Node id - used to resolve the tooltip content on hover
   */
  id: string;
  /**
   * Fill the group height - when the title is missing or the group does not render any children
   */
  fill?: boolean;
};

export const TileGroupTitle = (props: TileGroupTitleProps) => {
  const { id, fill = false, ...restProps } = props;

  return (
    <div
      className={cx(css.root, fill && css.fill)}
      data-treemap-id={id}
      data-treemap-tile-group-title
    >
      <TileGroupTitleContent {...restProps} />
    </div>
  );
};
