import React from 'react';
import PropTypes from 'prop-types';

import css from './empty-set.module.css';

export const EmptySet = (props) => {
  const { resources, filtered, resetFilters } = props;

  const message = filtered ? `No ${resources} found.` : `No ${resources} available.`;

  return (
    <div className={css.root}>
      <p className={css.text}>{message}</p>
      {filtered && (
        <button className={css.action} type="button" onClick={() => resetFilters()}>
          View all
        </button>
      )}
    </div>
  );
};

EmptySet.propTypes = {
  resources: PropTypes.string.isRequired,
  filtered: PropTypes.bool.isRequired,
  resetFilters: PropTypes.func.isRequired,
};
