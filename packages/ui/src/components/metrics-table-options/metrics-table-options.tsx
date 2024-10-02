import type { ComponentProps } from 'react';
import React from 'react';

import I18N from '../../i18n';
import { Dropdown, DropdownItem } from '../../ui/dropdown';
import { Separator } from '../../layout/separator';

type MetricsTableOptionsProps = {
  onViewAllClick?: () => void;
  onResetClick?: () => void;
  onExportClick?: () => void;
} & ComponentProps<typeof Dropdown>;

export const MetricsTableOptions = (props: MetricsTableOptionsProps) => {
  const { onViewAllClick, onResetClick, onExportClick, ...restProps } = props;

  return (
    <Dropdown glyph="more-vertical" {...restProps}>
      {onResetClick && <DropdownItem onClick={onResetClick}>{I18N.RESET_FILTERS}</DropdownItem>}
      {onViewAllClick && <DropdownItem onClick={onViewAllClick}>{I18N.VIEW_ALL}</DropdownItem>}
      {((onResetClick || onViewAllClick) && onExportClick) && <Separator />}
      {onExportClick && <DropdownItem onClick={onExportClick}>{I18N.EXPORT}</DropdownItem>}
    </Dropdown>
  );
};
