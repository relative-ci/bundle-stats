import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import config from '../../config.json';
import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { HoverCard } from '../../ui/hover-card';
import css from './total-size-type-title.module.css';

export const TotalSizeTypeTitle = ({ className }) => (
  <FlexStack space="xxxsmall" alignItems="center" className={cx(css.root, className)}>
    <span className={css.text}>{I18N.ASSET_TOTALS}</span>
    <HoverCard label={<Icon glyph={Icon.ICONS.HELP} />} anchorClassName={css.anchor}>
      <Stack space="xxxsmall">
        <p>{I18N.ASSET_TOTALS_INFO}</p>
        <p>
          <Button
            kind="primary"
            type="button"
            onClick={() => window.open(config.documentation.assets)}
            className={css.readMoreLink}
          >
            {I18N.READ_MORE}
          </Button>
        </p>
      </Stack>
    </HoverCard>
  </FlexStack>
);

TotalSizeTypeTitle.propTypes = {
  className: PropTypes.string,
};

TotalSizeTypeTitle.defaultProps = {
  className: '',
};
