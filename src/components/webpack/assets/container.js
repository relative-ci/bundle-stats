import { compose, withProps, withState } from 'recompose';
import { sortBy } from 'lodash';

import computeDelta from '../../../utils/compute-delta';
import getAssetsById from './utils/get-assets-by-id';
import mergeAssetsById from './utils/merge-assets-by-id';
import formatDataSet from './utils/format-data-set';
import {
  FILTER_SHOW_ALL,
  FILTER_SHOW_CHANGED,
} from './constants';

const filterByState = show => (item) => {
  if (show === FILTER_SHOW_ALL) {
    return true;
  }

  return item.data.changed;
};

const sortByStateAndName = item =>
  [!item.data.changed, item.key];

const enhance = compose(
  withProps(({ entries }) => {
    const assetsById = entries.map(({ data }) => getAssetsById(data.assets));
    const data = computeDelta(formatDataSet(mergeAssetsById(assetsById)));

    return {
      rows: sortBy(data, sortByStateAndName),
    };
  }),

  // Filter rows
  withState('show', 'setShow', FILTER_SHOW_CHANGED),
  withProps(({ rows, show }) => ({
    rows: rows.filter(filterByState(show)),
  })),
);

export default enhance;
