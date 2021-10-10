import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import squarify from './treemap-squarify';
import css from './treemap.module.css'

const DefaultItem = ({ item, ...restProps }) => (
  <div {...restProps}>
    <span className={css.itemLabel}>
      {item.data?.label || item.id}
    </span>
  </div>
);

DefaultItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.shape({
      label: PropTypes.string,
    }),
  }).isRequired,
};

/**
 * Treemap component
 * @NOTE Based on https://github.com/pastelsky/bundlephobia/blob/babd0d71b54ad1404c4399e0c08363c493c53502/client/components/Treemap/Treemap.js
 */
export const Treemap = ({ className, data, Item }) => {
  const rootClassName = cx(css.root, className);
  const containerRef = useRef();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const width = containerRef?.current?.clientWidth || 640;
    const height = containerRef?.current?.clientHeight || 210;

    const values = data.map(({ value }) => value);
    const itemCoordinates = squarify(values, width, height, 0, 0);

    const newItems = data.map((item, index) => {
      const coordinates = itemCoordinates[index];

      // @todo - test relative position/dimension
      return {
        ...item,
        style: {
          left: coordinates[0],
          top: coordinates[1],
          width: coordinates[2] - coordinates[0],
          height: coordinates[3] - coordinates[1],
        },
      };
    });

    setItems(newItems);
  }, [data]);

  return (
    <div className={rootClassName} ref={containerRef}>
      {items.map((item) => (
        <Item className={css.item} style={item.style} item={item} />
      ))}
    </div>
  );
};

Treemap.defaultProps = {
  className: '',
  Item: DefaultItem,
};

Treemap.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }),
  ).isRequired,
  Item: PropTypes.element,
};
