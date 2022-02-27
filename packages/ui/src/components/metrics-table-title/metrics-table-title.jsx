import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Icon } from '../../ui/icon';
import { HoverCard } from '../../ui/hover-card';
import css from './metrics-table-title.module.css';

export const MetricsTableTitle = (props) => {
  const { className, title, info, popoverInfo, popoverHref } = props;
  const rootClassName = cx(css.root, className);

  return (
    <FlexStack space="xxxsmall" className={rootClassName}>
      <span>{title}</span>
      {info && <span className={css.info}>{info}</span>}
      {(popoverInfo || popoverHref) && (
        <HoverCard label={<Icon glyph="help" />}>
          <Stack space="xxxsmall">
            {popoverInfo && <p>{popoverInfo}</p>}
            {popoverHref && (
              <p>
                <a href={popoverHref} target="_blank" rel="noreferrer">
                  {I18N.READ_MORE}
                </a>
              </p>
            )}
          </Stack>
        </HoverCard>
      )}
    </FlexStack>
  );
};

MetricsTableTitle.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  info: PropTypes.node,
  popoverHref: PropTypes.string,
  popoverInfo: PropTypes.string,
};

MetricsTableTitle.defaultProps = {
  className: '',
  info: null,
  popoverHref: '',
  popoverInfo: '',
};
