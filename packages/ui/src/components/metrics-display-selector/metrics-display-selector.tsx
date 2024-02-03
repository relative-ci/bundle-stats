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
  props: MetricsDisplaySelectorProps & React.ComponentProps<typeof FlexStack>,
) => {
  const { className = '', value, onSelect, ...restProps } = props;

  return (
    <FlexStack space="xxsmall" as="nav" className={cx(css.root, className)} {...restProps}>
      <Button
        outline
        active={value === MetricsDisplayType.TABLE}
        size="small"
        type="button"
        onClick={() => onSelect(MetricsDisplayType.TABLE)}
        className={css.button}
      >
        <FlexStack space="xxxsmall" alignItems="center">
          <Icon glyph={Icon.ICONS.TABLE} className={css.icon} />
          <span>Table</span>
        </FlexStack>
      </Button>
      <Button
        outline
        active={value === MetricsDisplayType.TREEMAP}
        size="small"
        type="button"
        onClick={() => onSelect(MetricsDisplayType.TREEMAP)}
        className={cx(css.button)}
      >
        <FlexStack space="xxxsmall" alignItems="center">
          <Icon glyph={Icon.ICONS.TREEMAP} className={css.icon} />
          <span>Treemap</span>
        </FlexStack>
      </Button>
    </FlexStack>
  );
};
