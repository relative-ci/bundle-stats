import type { ComponentProps } from 'react';
import React from 'react';

import I18N from '../../i18n';
import { Dropdown, DropdownItem } from '../../ui/dropdown';

type MetricsTableOptionsProps = {
  handleViewAll?: () => void;
  handleResetFilters?: () => void;
} & ComponentProps<typeof Dropdown>;

export const MetricsTableOptions = (props: MetricsTableOptionsProps) => {
  const { className = '', handleViewAll, handleResetFilters, ...restProps } = props;

  return (
    <Dropdown className={className} glyph="more-vertical" {...restProps}>
      {handleResetFilters && (
        <DropdownItem onClick={handleResetFilters}>{I18N.RESET_FILTERS}</DropdownItem>
      )}
      {handleViewAll && <DropdownItem onClick={handleViewAll}>{I18N.VIEW_ALL}</DropdownItem>}
    </Dropdown>
  );
};
