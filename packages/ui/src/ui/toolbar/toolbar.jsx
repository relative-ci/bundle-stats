import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { FlexStack } from '../../layout/flex-stack';
import css from './toolbar.module.css';

export const Toolbar = (props) => {
  const { className, children, renderActions } = props;
  const rootClassName = cx(css.root, className);

  return (
    <div className={rootClassName}>
      <div className={css.content}>{children}</div>
      {renderActions && (
        <FlexStack gap="xsmall" alignItems="center" className={css.actions}>
          {renderActions({ actionClassName: css.action })}
        </FlexStack>
      )}
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  renderActions: PropTypes.func,
};

Toolbar.defaultProps = {
  className: '',
  renderActions: null,
};
