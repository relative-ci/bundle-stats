import React from 'react';
import cx from 'classnames';

export const getRenderChildWithClassName = (className: string) => (child: any) => {
  if (child === null || child === '') {
    return null;
  }

  const { props } = child;

  if (!props) {
    return <div className={className}>{child}</div>;
  }

  return React.cloneElement(child, {
    ...props,
    className: cx(className, props.className), // eslint-disable-line react/prop-types
  });
};
