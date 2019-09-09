export const FILTER_ASSET = 'asset';
export const FILTER_CHANGED = 'changed';
export const FILTER_ENTRY = 'entrypoint';
export const FILTER_INITIAL = 'initial';
export const FILTER_CHUNK = 'chunk';

export const SORT_BY_NAME = 'name';
export const SORT_BY_SIZE = 'size';
export const SORT_BY_DELTA = 'delta';

export const SORT_BY = {
  [SORT_BY_NAME]: {
    label: 'Name',
    defaultDirection: 'asc',
  },
  [SORT_BY_DELTA]: {
    label: 'Delta',
    defaultDirection: 'desc',
  },
  [SORT_BY_SIZE]: {
    label: 'Size',
    defaultDirection: 'desc',
  },
};
