import type { ComponentProps } from 'react';
import React from 'react';

import I18N from '../../i18n';
import { Dropdown, DropdownItem } from '../../ui/dropdown';
import css from './metrics-table-options.module.css';

type MetricsTableOptionsProps = {
  onViewAllClick?: () => void;
  onResetClick?: () => void;
  onExportClick?: (sourceType: string) => void;
} & ComponentProps<typeof Dropdown>;

export const MetricsTableOptions = (props: MetricsTableOptionsProps) => {
  const { onViewAllClick, onResetClick, onExportClick, ...restProps } = props;

  return (
    <Dropdown glyph="more-vertical" placement="bottom-end" {...restProps}>
      <div className={css.group}>
        {onResetClick && <DropdownItem onClick={onResetClick}>{I18N.RESET_FILTERS}</DropdownItem>}
        {onViewAllClick && <DropdownItem onClick={onViewAllClick}>{I18N.VIEW_ALL}</DropdownItem>}
      </div>
      <div className={css.group}>
        {onExportClick && (
          <>
            <DropdownItem onClick={() => onExportClick('csv')}>{I18N.EXPORT_CSV}</DropdownItem>
            <DropdownItem onClick={() => onExportClick('json')}>{I18N.EXPORT_JSON}</DropdownItem>
          </>
        )}
      </div>
    </Dropdown>
  );
};
