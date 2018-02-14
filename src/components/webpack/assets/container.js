import { compose, withProps, withState } from 'recompose';
import { sortBy } from 'lodash';

import withMetrics from '../../../hocs/with-metrics';
import getAssetsById from './utils/get-assets-by-id';

import {
  FILTER_SHOW_ALL,
  FILTER_SHOW_CHANGED,
} from './constants';

const filterByState = show => (item) => {
  if (show === FILTER_SHOW_ALL) {
    return true;
  }

  return item.changed;
};

const sortByStateAndName = item =>
  [!item.changed, item.key];

const enhance = compose(
  withProps(({ runs }) => {
    // Assets specific transformations
    const assetsById = runs.map(({ label, data }) => ({
      label,
      data: getAssetsById((data && data.assets) || []),
    }));

    return {
      runs: assetsById,
    };
  }),

  withMetrics(),

  // Filter rows
  withState('show', 'setShow', FILTER_SHOW_CHANGED),
  withProps(({ rows, show }) => ({
    rows: sortBy(rows, sortByStateAndName).filter(filterByState(show)),
  })),
);

export default enhance;
