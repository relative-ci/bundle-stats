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
    <Stack className={rootClassName}>
      <FlexStack space="xxxsmall" className={css.title}>
        <span>{title}</span>
        {(popoverInfo || popoverHref) && (
          <HoverCard label={<Icon glyph="help" />} anchorClassName={css.anchor}>
            <Stack space="xxxsmall">
              {popoverInfo && <p>{popoverInfo}</p>}
              {popoverHref && (
                <p>
                  <button type="button" onClick={() => window.open(popoverHref)} className={css.readMoreLink}>
                    {I18N.READ_MORE}
                  </button>
                </p>
              )}
            </Stack>
          </HoverCard>
        )}
      </FlexStack>
      {info && <p className={css.info}>{info}</p>}
    </Stack>
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
