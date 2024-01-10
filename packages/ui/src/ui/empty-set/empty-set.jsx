import React from 'react';
import PropTypes from 'prop-types';

import I18N from '../../i18n';
import { Stack } from '../../layout/stack';
import { Button } from '../button';
import css from './empty-set.module.css';

export const EmptySet = (props) => {
  const { resources, filtered, handleResetFilters, handleViewAll } = props;

  const message = filtered ? `No ${resources} found.` : `No ${resources} available.`;
  const actions = [
    ...(handleResetFilters
      ? [
          <Button kind="primary" type="button" onClick={handleResetFilters} className={css.action}>
            {I18N.RESET_FILTERS}
          </Button>,
        ]
      : []),
    ...(handleViewAll
      ? [
          <Button kind="primary" type="button" onClick={handleViewAll} className={css.action}>
            {I18N.VIEW_ALL}
          </Button>,
        ]
      : []),
  ];

  return (
    <Stack space="xxxsmall" className={css.root}>
      <p>{message}</p>
      {filtered &&
        actions.map((action, index) => (
          <>
            {index > 0 && ' or '}
            {action}
          </>
        ))}
    </Stack>
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
