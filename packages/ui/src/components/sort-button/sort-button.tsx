import React, { useCallback } from 'react';
import cx from 'classnames';

import { SORT } from '../../constants';
import type { SortAction } from '../../types';
import { Icon } from '../../ui/icon';
import { Tooltip } from '../../ui/tooltip';
import css from './sort-button.module.css';

interface SortInfo {
  direction: string;
  title: string;
}

const getToggleAction = (sort: SortAction, field: string, label: string): SortInfo => {
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

interface SortButtonProps {
  fieldPath: string;
  fieldName: string;
  label: string;
  sort: SortAction;
  updateSort: (params: SortAction) => void;
}

export const SortButton = (props: SortButtonProps & React.ComponentProps<'div'>) => {
  const { className = '', children, fieldPath, fieldName, label, sort, updateSort } = props;

  const field = `${fieldPath}.${fieldName}`;
  const toggleAction = getToggleAction(sort, field, label);
  const ascAction = getAscAction(label);
  const descAction = getDescAction(label);
  const isSorted = sort.field === field;

  const getOrderOnClick = useCallback(
    (action: SortInfo) => () => {
      if (action.direction) {
        updateSort({ field, direction: action.direction as SortAction['direction'] });
        return;
      }

      updateSort({ field: '', direction: '' });
    },
    [field, updateSort, toggleAction],
  );

  return (
    <div className={cx(css.root, className, isSorted && css.active)}>
      <Tooltip
        title={toggleAction.title}
        as="button"
        type="button"
        onClick={getOrderOnClick(toggleAction)}
        className={cx(css.button, css.toggle)}
      >
        {children}
      </Tooltip>
      <Tooltip
        title={ascAction.title}
        as="button"
        type="button"
        onClick={getOrderOnClick(ascAction)}
        className={cx(
          css.button,
          css.direction,
          css.directionAsc,
          isSorted && sort.direction === SORT.ASC && css.directionActive,
        )}
      >
        <Icon glyph={Icon.ICONS.CHEVRON_UP} size="small" className={css.directionIcon} />
      </Tooltip>
      <Tooltip
        title={descAction.title}
        as="button"
        type="button"
        onClick={getOrderOnClick(descAction)}
        className={cx(
          css.button,
          css.direction,
          css.directionDesc,
          isSorted && sort.direction === SORT.DESC && css.directionActive,
        )}
      >
        <Icon glyph={Icon.ICONS.CHEVRON_DOWN} size="small" className={css.directionIcon} />
      </Tooltip>
    </div>
  );
};
