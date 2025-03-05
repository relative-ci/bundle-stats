import React from 'react';
import cx from 'classnames';

import {
  MetricsDisplayType,
  MetricsDisplayGroupByDefault,
  MetricsDisplayGroupBy,
} from '../../constants';
import { Button } from '../../ui/button';
import { ControlGroup } from '../../ui/control-group';
import { Dropdown, DropdownItem } from '../../ui/dropdown';
import { Icon } from '../../ui/icon';
import { FlexStack } from '../../layout/flex-stack';
import css from './metrics-display-selector.module.css';

const METRICS_DISPLAY_MAP = {
  [MetricsDisplayType.TABLE]: {
    glyph: Icon.ICONS.TABLE,
    label: 'Table',
  },
  [MetricsDisplayType.TREEMAP]: {
    glyph: Icon.ICONS.TREEMAP,
    label: 'Treemap',
  },
};

const displayTypes = Object.values(MetricsDisplayType);

interface MetricsDisplaySelectorProps {
  value: MetricsDisplayType;
  groupBy?: string;
  groups?: Partial<Record<MetricsDisplayType, Array<string>>>;
  onSelect: (newValue: MetricsDisplayType, groupBy?: string) => void;
}

export const MetricsDisplaySelector = (
  props: MetricsDisplaySelectorProps &
    Omit<React.ComponentProps<typeof ControlGroup>, 'onSelect' | 'value'>,
) => {
  const {
    value,
    groupBy = MetricsDisplayGroupByDefault,
    groups = {},
    onSelect,
    ...restProps
  } = props;

  return (
    <ControlGroup {...restProps}>
      {displayTypes.map((displayType, index) => {
        const displayGroups = groups?.[displayType];
        const displayProps = METRICS_DISPLAY_MAP[displayType];
        const isLast = displayTypes.length - 1 === index;
        const isActive = displayType === value;

        if (!displayGroups || displayGroups.length === 0) {
          return (
            <Button
              outline
              active={isActive}
              size="small"
              type="button"
              glyph={displayProps.glyph}
              onClick={() => onSelect(displayType)}
              className={cx(isLast && css.itemLast)}
              key={displayType}
            >
              {displayProps.label}
            </Button>
          );
        }

        const displayGroupsData = [
          ...displayGroups.map((displayGroup) => ({
            value: displayGroup,
            label: `Group by ${displayGroup}`,
          })),
          {
            value: MetricsDisplayGroupBy.NONE,
            label: 'No group',
          },
        ];

        return (
          <FlexStack
            className={cx(css.dropdownGroup, isLast && css.itemLast, isActive && css.itemActive)}
            key={displayType}
          >
            <Button
              size="small"
              glyph={displayProps.glyph}
              onClick={() => onSelect(displayType)}
              className={css.dropdownGroupButton}
            >
              {displayProps.label}
            </Button>
            <Dropdown
              glyph={Icon.ICONS.CHEVRON_DOWN}
              placement="bottom-end"
              className={css.dropdownGroupAnchor}
            >
              {displayGroupsData.map((displayGroupData) => {
                const isGroupActive = isActive && displayGroupData.value === groupBy;

                return (
                  <DropdownItem
                    onClick={() => onSelect(displayType, displayGroupData.value)}
                    isActive={isGroupActive}
                    className={cx(css.dropdownItem, isGroupActive && css.dropdownItemActive)}
                    key={displayGroupData.value}
                  >
                    <FlexStack space="xxxsmall" alignItems="center">
                      <Icon
                        glyph={Icon.ICONS.CHECK}
                        size="small"
                        className={css.dropdownItemIcon}
                      />
                      <span>{displayGroupData.label}</span>
                    </FlexStack>
                  </DropdownItem>
                );
              })}
            </Dropdown>
          </FlexStack>
        );
      })}
    </ControlGroup>
  );
};
