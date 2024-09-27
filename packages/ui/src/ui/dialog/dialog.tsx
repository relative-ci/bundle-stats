import type { ComponentProps, ReactNode } from 'react';
import React from 'react';
import cx from 'classnames';
import { Dialog as AriakitDialog, DialogDismiss as AriakitDialogDismiss } from 'ariakit/dialog';

import { Stack } from '../../layout/stack';
import { BUTTON_GLYPHS, Button } from '../button';
import css from './dialog.module.css';

export { useDialogState } from 'ariakit/dialog';

type AriakitDialogProps = ComponentProps<typeof AriakitDialog>;

type DialogProps = {
  title?: ReactNode;
  width?: 'narrow' | 'medium' | 'wide' | 'extra-wide';
  center?: boolean;
  modal?: AriakitDialogProps['modal'];
  state: AriakitDialogProps['state'];
} & Omit<ComponentProps<'div'>, 'title'>;

export const Dialog = (props: DialogProps) => {
  const {
    state,
    className = '',
    title = '',
    width = 'medium',
    center = false,
    modal = false,
    children,
  } = props;

  const rootClassName = cx(css.dialog, width && css[`width--${width}`], center && css.center);

  return (
    <AriakitDialog
      state={state}
      modal={modal}
      backdrop
      backdropProps={{
        className: css.backdrop,
      }}
      portal
      className={rootClassName}
    >
      {!modal && (
        <AriakitDialogDismiss as={Button} glyph={BUTTON_GLYPHS.CLOSE} className={css.headerClose}>
          {/* null content to prevent DialogDismiss to render the default "x" */}
          {null}
        </AriakitDialogDismiss>
      )}
      <Stack space="medium">
        {title && (
          <header className={css.header}>
            {typeof title === 'string' ? <h2>{title}</h2> : title}
          </header>
        )}
        <div className={cx(css.content, className)}>{children}</div>
      </Stack>
    </AriakitDialog>
  );
};
