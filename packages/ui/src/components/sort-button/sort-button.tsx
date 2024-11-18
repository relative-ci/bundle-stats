import React, { useCallback } from 'react';
import cx from 'classnames';

import { SORT } from '../../constants';
import type { SortAction } from '../../types';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Tooltip } from '../../ui/tooltip';
import css from './sort-button.module.css';

interface SortInfo {
  direction: string;
  title: string;
}

const getToggleAction = (field: string, label: string, sort?: SortAction): SortInfo => {
  // Sort the column desc if not currently sorted
  if (sort?.field !== field) {
    return { direction: SORT.DESC, title: `Order ${label} descending` };
  }

  // Resort asc if the column is already sorted descending
  if (sort?.direction === SORT.DESC) {
    return { direction: SORT.ASC, title: `Order ${label} ascending` };
  }

  // Reset
  return { direction: '', title: 'Reset order' };
};

const getAscAction = (label: string): SortInfo => {
  return { direction: SORT.ASC, title: `Order ${label} ascending` };
};

const getDescAction = (label: string): SortInfo => {
  return { direction: SORT.DESC, title: `Order ${label} descending` };
};

export interface SortButtonProps {
  fieldPath: string;
  fieldName: string;
  label: string;
  sort?: SortAction;
  updateSort?: (params: SortAction) => void;
}

export const SortButton = (props: SortButtonProps & React.ComponentProps<'div'>) => {
  const { className = '', children, fieldPath, fieldName, label, sort, updateSort } = props;

  const field = `${fieldPath}.${fieldName}`;
  const toggleAction = getToggleAction(field, label, sort);
  const ascAction = getAscAction(label);
  const descAction = getDescAction(label);
  const isSorted = sort?.field === field;

  const getOrderOnClick = useCallback(
    (action: SortInfo) => () => {
      if (!updateSort) {
        return;
      }

      if (action.direction) {
        updateSort({ field, direction: action.direction as SortAction['direction'] });
        return;
      }

      updateSort({ field: '', direction: '' });
    },
    [field, updateSort, toggleAction],
  );

  if (!updateSort) {
    return <div className={cx(css.root, className)}>{children}</div>;
  }

  return (
    <div className={cx(css.root, css.interactive, className, isSorted && css.active)}>
      <Button type="button" onClick={getOrderOnClick(toggleAction)} className={css.toggle}>
        <Tooltip title={toggleAction.title}>{children}</Tooltip>
      </Button>
      <Button
        type="button"
        onClick={getOrderOnClick(ascAction)}
        className={cx(
          css.direction,
          css.directionAsc,
          isSorted && sort.direction === SORT.ASC && css.directionActive,
        )}
      >
        <Tooltip title={ascAction.title}>
          <Icon glyph={Icon.ICONS.CHEVRON_UP} size="small" className={css.directionIcon} />
        </Tooltip>
      </Button>
      <Button
        type="button"
        onClick={getOrderOnClick(descAction)}
        className={cx(
          css.direction,
          css.directionDesc,
          isSorted && sort.direction === SORT.DESC && css.directionActive,
        )}
      >
        <Tooltip title={descAction.title}>
          <Icon glyph={Icon.ICONS.CHEVRON_DOWN} size="small" className={css.directionIcon} />
        </Tooltip>
      </Button>
    </div>
  );
};
