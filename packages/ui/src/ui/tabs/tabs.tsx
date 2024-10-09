import type { ComponentProps, ElementType } from 'react';
import React from 'react';
import cx from 'classnames';

import css from './tabs.module.css';

export type ItemProps<T extends ElementType> = {
  isTabActive?: boolean;
  as?: T;
} & ComponentProps<T>;

const Item = <T extends ElementType = 'span'>(props: ItemProps<T>) => {
  const { isTabActive = false, as: Component = 'span', className = '', ...restProps } = props;

  return (
    <Component className={cx(css.item, className, isTabActive && css.itemActive)} {...restProps} />
  );
};

export type TabsProps = ComponentProps<'nav'>;

export const Tabs = (props: TabsProps) => {
  const { className = '', ...restProps } = props;

  return <nav className={cx(css.root, className)} {...restProps} />;
};

Tabs.Item = Item;
