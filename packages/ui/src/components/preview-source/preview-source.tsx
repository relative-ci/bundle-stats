import type { ComponentProps } from 'react';
import React from 'react';
import cx from 'classnames';

import { Button, BUTTON_GLYPHS } from '../../ui/button';
import { CopyToClipboard } from '../../ui/copy-to-clipboard';
import { ControlGroup } from '../../ui/control-group';
import { Tooltip } from '../../ui/tooltip';
import { Textarea } from '../../ui/textarea';
import css from './preview-source.module.css';

const DEFAULT_ROWS = 10;

type PreviewSourceProps = {
  source?: string;
  /**
   * Textarea rows
   */
  rows?: number;
  /**
   * Link download attribute
   * @example
   *   bundle-stats--assets.json
   */
  download?: string;
} & ComponentProps<'div'>;

export const PreviewSource = (props: PreviewSourceProps) => {
  const { className = '', source, rows = DEFAULT_ROWS, download = false, ...restProps } = props;

  const isEmpty = !source;
  const rootClassName = cx(css.root, className, isEmpty && css.isEmpty);

  return (
    <div className={rootClassName} {...restProps}>
      {source && (
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
      )}
      <Textarea
        rows={rows}
        value={source}
        readOnly
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        translate="no"
        className={css.content}
      />
    </div>
  );
};
