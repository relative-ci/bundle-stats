import React from 'react';
import cx from 'classnames';

import css from './table.module.css';

interface TableProps {
  emptyMessage?: React.ReactNode;
  compact?: boolean;
  outline?: boolean;
}

export const Table = (props: TableProps & React.ComponentProps<'table'>) => {
  const {
    className = '',
    emptyMessage = null,
    compact = false,
    outline = false,
    children,
    ...restProps
  } = props;
  const rootClassName = cx(css.root, className, compact && css.compact, outline && css.outline);

  if (!children) {
    return <div className={cx(rootClassName, css.empty)}>{emptyMessage}</div>;
  }

  return (
    <table className={rootClassName} {...restProps}>
      {children}
    </table>
  );
};

Table.THead = 'thead' as React.ElementType;
Table.TBody = 'tbody' as React.ElementType;
Table.Tr = 'tr' as React.ElementType;
Table.Th = 'th' as React.ElementType;
Table.Td = 'td' as React.ElementType;
