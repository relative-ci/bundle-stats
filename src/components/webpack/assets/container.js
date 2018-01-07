import { compose, withProps, withState } from 'recompose';
import { sortBy } from 'lodash';

import getAssetsById from './utils/get-assets-by-id';
import mergeAssetsById from './utils/merge-assets-by-id';
import processAssets from './utils/process-assets';
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
    const data = processAssets(mergeAssetsById(assetsById));

    return {
      data: sortBy(data, sortByStateAndName),
    };
  }),

  // Filter rows
  withState('show', 'setShow', FILTER_SHOW_CHANGED),
  withProps(({ data, show }) => ({
    data: data.filter(filterByState(show)),
  })),
);

export default enhance;
