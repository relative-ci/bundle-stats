import type { ComponentProps } from 'react';
import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import { useCopyToClipboard } from 'react-use';

import { Button } from '../button';
import { Icon } from '../icon';
import { Tooltip } from '../tooltip';
import css from './copy-to-clipboard.module.css';

export type CopyToClipboardProps = {
  /**
   * Text to copy to clipboard
   */
  text: string;
} & ComponentProps<typeof Button>;

export const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { className = '', children, text, ...restProps } = props;

  const [, copyToClipboard] = useCopyToClipboard();
  const [doneTimeout, setDoneTimeout] = useState<ReturnType<typeof setTimeout> | null>();

  const handleOnClick = useCallback(() => {
    if (doneTimeout) {
      clearTimeout(doneTimeout);
      setDoneTimeout(null);
    }

    setDoneTimeout(null);
    copyToClipboard(text);

    const done = setTimeout(() => setDoneTimeout(null), 2000);
    setDoneTimeout(done);
  }, [text, doneTimeout, setDoneTimeout]);

  const rootClassName = cx(css.root, className, doneTimeout && css.done);

  return (
    <Tooltip
      title={doneTimeout ? 'Copied' : 'Copy to clipboard'}
      as={Button}
      type="button"
      onClick={handleOnClick}
      className={rootClassName}
      {...restProps}
    >
      <span className={css.wrapper}>
        {children && <span className={css.content}>{children}</span>}
        <span className={css.icon}>
          <Icon className={css.iconCopy} glyph={Icon.ICONS.CLIPBOARD} />
          <Icon className={css.iconDone} glyph={Icon.ICONS.CLIPBOARD_CHECK} />
        </span>
      </span>
    </Tooltip>
  );
};
