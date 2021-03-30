import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Icon } from '../../ui/icon';

import css from './metrics-table-search.module.css';

export const MetricsTableSearch = (props) => {
  const { className, placeholder, search, updateSearch } = props;
  const rootClassname = cx(css.root, className);

  return (
    <div className={rootClassname}>
      <input
        className={cx('ui-input', 'ui-input--small', css.input)}
        placeholder={placeholder}
        onChange={(event) => updateSearch(event.target.value)}
        value={search}
      />
      {search && (
        <button
          className={css.cancelButton}
          type="button"
          onClick={() => updateSearch('')}
        >
          <Icon className={css.cancelButtonIcon} glyph="cancel" />
        </button>
      )}
    </div>
  );
};

MetricsTableSearch.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

MetricsTableSearch.defaultProps = {
  className: '',
  placeholder: '',
};
