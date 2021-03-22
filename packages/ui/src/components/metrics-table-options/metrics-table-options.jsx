import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import I18N from '../../i18n';
import { Dropdown } from '../../ui/dropdown';
import css from './metrics-table-options.module.css';

export const MetricsTableOptions = (props) => {
  const { className,  handleViewAll, handleResetFilters, ...restProps } = props;
  const rootClassName = cx(css.root, className);

  return (
    <Dropdown className={rootClassName} glyph="menu" align="right" {...restProps}>
      {({ MenuItem, menu }) => {
        const getButtonOnClick = (handler) => () => {
          handler();
          menu.toggle();
        };

        return (
          <>
            {handleResetFilters && (
              <MenuItem {...menu} className={css.item} onClick={getButtonOnClick(handleResetFilters)}>
                {I18N.RESET_FILTERS}
              </MenuItem>
            )}
            {handleViewAll && (
              <MenuItem {...menu} className={css.item} onClick={getButtonOnClick(handleViewAll)}>
                {I18N.VIEW_ALL}
              </MenuItem>
            )}
          </>
        );
      }}
    </Dropdown>
  );
};

MetricsTableOptions.propTypes = {
  className: PropTypes.string,
  handleViewAll: PropTypes.func,
  handleResetFilters: PropTypes.func,
};

MetricsTableOptions.defaultProps = {
  className: '',
  handleViewAll: null,
  handleResetFilters: null,
};
