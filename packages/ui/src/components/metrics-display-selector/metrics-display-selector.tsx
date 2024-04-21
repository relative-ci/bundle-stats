import React from 'react';

import { MetricsDisplayType } from '../../constants';
import { Button } from '../../ui/button';
import { ControlGroup } from '../../ui/control-group';
import { Icon } from '../../ui/icon';

interface MetricsDisplaySelectorProps {
  value: MetricsDisplayType;
  onSelect: (newValue: MetricsDisplayType) => void;
}

export const MetricsDisplaySelector = (
  props: MetricsDisplaySelectorProps &
    Omit<React.ComponentProps<typeof ControlGroup>, 'onSelect' | 'value'>,
) => {
  const { value, onSelect, ...restProps } = props;

  return (
    <ControlGroup {...restProps}>
      <Button
        outline
        active={value === MetricsDisplayType.TABLE}
        size="small"
        type="button"
        glyph={Icon.ICONS.TABLE}
        onClick={() => onSelect(MetricsDisplayType.TABLE)}
      >
        Table
      </Button>
      <Button
        outline
        active={value === MetricsDisplayType.TREEMAP}
        size="small"
        type="button"
        glyph={Icon.ICONS.TREEMAP}
        onClick={() => onSelect(MetricsDisplayType.TREEMAP)}
      >
        Treemap
      </Button>
    </ControlGroup>
  );
};
