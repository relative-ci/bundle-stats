import type { ComponentProps, ElementType } from 'react';
import React from 'react';
import cx from 'classnames';

import css from './tabs.module.css';

export type TabItemProps<T extends ElementType> = {
  isTabActive?: boolean;
  as?: T;
} & ComponentProps<T>;

export const TabItem = <T extends ElementType = 'button'>(props: TabItemProps<T>) => {
  const { className = '', as: Component = 'button', isTabActive = false, ...restProps } = props;

  return (
    <Component
      role="tab"
      className={cx(css.item, className, isTabActive && css.itemActive)}
      {...restProps}
    />
  );
};

export type TabsProps = ComponentProps<'div'>;

export const Tabs = (props: TabsProps) => {
  const { className = '', ...restProps } = props;

  return <div role="tablist" className={cx(css.root, className)} {...restProps} />;
};

Tabs.Item = TabItem;
