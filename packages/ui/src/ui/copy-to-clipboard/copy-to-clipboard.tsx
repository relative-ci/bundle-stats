import type { ComponentProps } from 'react';
import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import { useCopyToClipboard } from 'react-use';

import I18N from '../../i18n';
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
      title={doneTimeout ? I18N.COPY_TO_CLIPBOARD_DONE : I18N.COPY_TO_CLIPBOARD}
      as={Button}
      type="button"
      rightGlyph={doneTimeout ? Icon.ICONS.CLIPBOARD_CHECK : Icon.ICONS.CLIPBOARD}
      onClick={handleOnClick}
      className={rootClassName}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};
