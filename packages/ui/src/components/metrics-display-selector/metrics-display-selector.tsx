import React from 'react';
import cx from 'classnames';

import { MetricsDisplayType } from '../../constants';
import { FlexStack } from '../../layout/flex-stack';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import css from './metrics-display-selector.module.css';

interface MetricsDisplaySelectorProps {
  value: MetricsDisplayType;
  onSelect: (newValue: MetricsDisplayType) => void;
}

export const MetricsDisplaySelector = (
  props: MetricsDisplaySelectorProps &
    Omit<React.ComponentProps<typeof FlexStack>, 'onSelect' | 'value'>,
) => {
  const { className = '', value, onSelect, ...restProps } = props;

  return (
    <FlexStack space="xxsmall" as="nav" className={cx(css.root, className)} {...restProps}>
      <Button
        outline
        active={value === MetricsDisplayType.TABLE}
        size="small"
        type="button"
        glyph={Icon.ICONS.TABLE}
        onClick={() => onSelect(MetricsDisplayType.TABLE)}
        className={css.button}
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
        className={cx(css.button)}
      >
        Treemap
      </Button>
    </FlexStack>
  );
};
