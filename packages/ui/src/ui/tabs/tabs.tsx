import type { ComponentProps, ElementType } from 'react';
import React from 'react';
import cx from 'classnames';

import css from './tabs.module.css';

export type TabItemProps<T extends ElementType> = {
  isTabActive?: boolean;
  as?: T;
} & ComponentProps<T>;

export const TabItem = <T extends ElementType = 'span'>(props: TabItemProps<T>) => {
  const { className = '', as: Component = 'span', isTabActive = false, ...restProps } = props;

  return (
    <Component className={cx(css.item, className, isTabActive && css.itemActive)} {...restProps} />
  );
};

export type TabsProps = ComponentProps<'nav'>;

export const Tabs = (props: TabsProps) => {
  const { className = '', ...restProps } = props;

  return <nav className={cx(css.root, className)} {...restProps} />;
};

Tabs.Item = TabItem;
