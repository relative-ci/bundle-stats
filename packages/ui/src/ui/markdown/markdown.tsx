import React, { ComponentProps, ElementType, useMemo } from 'react';
import cx from 'classnames';
import snarkdown from 'snarkdown';

import css from './markdown.module.css';

type MarkdownProps = {
  content?: string;
  as?: ElementType;
} & ComponentProps<'div'>;

export const Markdown = (props: MarkdownProps) => {
  const { className = '', content = '', as: Component = 'div', ...restProps } = props;

  const html = useMemo(() => snarkdown(content), [content]);

  return (
    <Component
      className={cx(css.root, className)}
      {...restProps}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
