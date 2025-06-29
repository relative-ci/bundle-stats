import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { HoverCard } from '../../ui/hover-card';
import css from './metrics-table-title.module.css';

export const MetricsTableTitle = (props) => {
  const { className, title, info, popoverInfo, popoverHref } = props;
  const rootClassName = cx(css.root, className);

  return (
    <Stack space="none" className={rootClassName}>
      <FlexStack space="xxxsmall" alignItems="center" as="h3" className={css.title}>
        <span>{title}</span>

        {(popoverInfo || popoverHref) && (
          <HoverCard
            label={<Icon glyph={Icon.ICONS.HELP} className={css.anchorIcon} />}
            anchorClassName={css.anchor}
          >
            <Stack space="xxsmall">
              {popoverInfo && <p>{popoverInfo}</p>}
              {popoverHref && (
                <p>
                  <Button
                    kind="primary"
                    type="button"
                    onClick={() => window.open(popoverHref)}
                    className={css.readMore}
                  >
                    {I18N.LEARN_MORE}
                  </Button>
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
