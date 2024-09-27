import type { ComponentProps } from 'react';
import React from 'react';

import I18N from '../../i18n';
import { Dropdown, DropdownItem } from '../../ui/dropdown';

type MetricsTableOptionsProps = {
  onViewAllClick: () => void;
  onResetClick: () => void;
} & ComponentProps<typeof Dropdown>;

export const MetricsTableOptions = (props: MetricsTableOptionsProps) => {
  const { onViewAllClick, onResetClick, ...restProps } = props;

  return (
    <Dropdown glyph="more-vertical" {...restProps}>
      <DropdownItem onClick={onResetClick}>{I18N.RESET_FILTERS}</DropdownItem>
      <DropdownItem onClick={onViewAllClick}>{I18N.VIEW_ALL}</DropdownItem>
    </Dropdown>
  );
};
