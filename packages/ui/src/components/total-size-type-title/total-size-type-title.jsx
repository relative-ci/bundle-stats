import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames'

import config from '../../config.json';
import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Popover } from '../../ui/popover';
import css from './total-size-type-title.module.css';

export const TotalSizeTypeTitle = ({ className }) => (
  <FlexStack space="xxxsmall" className={cx(css.title, className)}>
    <span>{I18N.ASSET_TOTALS}</span>
    <Popover icon="help">
      <Stack space="xxxsmall">
        <p>{I18N.ASSET_TOTALS_INFO}</p>
        <p>
          <a
            href={config.documentation.assets}
            target="_blank"
            rel="noreferrer"
          >
            {I18N.READ_MORE}
          </a>
        </p>
      </Stack>
    </Popover>
  </FlexStack>
);

TotalSizeTypeTitle.propTypes = {
  className: PropTypes.string,
};

TotalSizeTypeTitle.defaultProps = {
  className: '',
};
