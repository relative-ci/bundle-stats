export const ORDER_BY_NAME = 'name';
export const ORDER_BY_SIZE = 'size';
export const ORDER_BY_DELTA = 'delta';

export const ORDER_BY = {
  [ORDER_BY_NAME]: {
    label: 'Name',
    defaultDirection: 'asc',
  },
  [ORDER_BY_DELTA]: {
    label: 'Delta',
    defaultDirection: 'desc',
  },
  [ORDER_BY_SIZE]: {
    label: 'Size',
    defaultDirection: 'desc',
  },
};
