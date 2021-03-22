import React from 'react';
import PropTypes from 'prop-types';

import I18N from '../../i18n';
import css from './empty-set.module.css';

export const EmptySet = (props) => {
  const { resources, filtered, handleResetFilters, handleViewAll } = props;

  const message = filtered ? `No ${resources} found.` : `No ${resources} available.`;
  const actions = [
    ...handleResetFilters ? [
      (
        <button className={css.action} type="button" onClick={handleResetFilters}>
          {I18N.RESET_FILTERS}
        </button>
      )
    ] : [],
    ...handleViewAll ? [(
      <button className={css.action} type="button" onClick={handleViewAll}>
        {I18N.VIEW_ALL}
      </button>
    )] : [],
  ];

  return (
    <div className={css.root}>
      <p className={css.text}>{message}</p>
      {filtered && actions.map((action, index) => (
        <>
          {index > 0 && ' or '}
          {action}
        </>
      ))}
    </div>
  );
};

EmptySet.propTypes = {
  resources: PropTypes.string.isRequired,
  filtered: PropTypes.bool.isRequired,
  handleResetFilters: PropTypes.func,
  handleViewAll: PropTypes.func,
};

EmptySet.defaultProps = {
  handleResetFilters: null,
  handleViewAll: null,
};
