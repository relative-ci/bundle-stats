import type { ComponentProps } from 'react';
import React from 'react';
import cx from 'classnames';

import { Button, BUTTON_GLYPHS } from '../../ui/button';
import { CopyToClipboard } from '../../ui/copy-to-clipboard';
import { ControlGroup } from '../../ui/control-group';
import { Tooltip } from '../../ui/tooltip';
import { Textarea } from '../../ui/textarea';
import css from './preview-source.module.css';

type PreviewSourceProps = {
  source: string;
  /**
   * Link download attribute
   * @example
   *   bundle-stats--assets.json
   */
  download?: string;
} & ComponentProps<'div'>;

export const PreviewSource = (props: PreviewSourceProps) => {
  const { className = '', source, download = false, ...restProps } = props;

  return (
    <div className={cx(css.root, className)} {...restProps}>
      <ControlGroup className={css.toolbar}>
        <CopyToClipboard outline size="small" text={source} />
        {download && (
          <Tooltip title={`Download ${download}`} className={css.downloadTooltip}>
            <Button
              outline
              rightGlyph={BUTTON_GLYPHS.DOWNLOAD}
              size="small"
              as="a"
              href={`data:application/json,${encodeURIComponent(source)}`}
              download={download}
            />
          </Tooltip>
        )}
      </ControlGroup>
      <Textarea previewSource readOnly rows={12} className={css.content}>
        {source}
      </Textarea>
    </div>
  );
};
