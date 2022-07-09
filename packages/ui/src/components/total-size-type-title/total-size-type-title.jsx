import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import config from '../../config.json';
import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Icon } from '../../ui/icon';
import { HoverCard } from '../../ui/hover-card';
import css from './total-size-type-title.module.css';

export const TotalSizeTypeTitle = ({ className }) => (
  <FlexStack space="xxxsmall" className={cx(css.title, className)}>
    <span>{I18N.ASSET_TOTALS}</span>
    <HoverCard label={<Icon glyph="help" />}>
      <Stack space="xxxsmall">
        <p>{I18N.ASSET_TOTALS_INFO}</p>
        <p>
          <button
            type="button"
            onClick={() => window.open(config.documentation.assets)}
            className={css.readMoreLink}
          >
            {I18N.READ_MORE}
          </button>
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
