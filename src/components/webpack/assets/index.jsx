import PropTypes from 'prop-types';
import { sortBy } from 'lodash';

import { fileSize } from '../../../config/metrics';
import Metric from '../../metric';
import Table from '../../table';
import EntryFlag from '../../entry-flag';
import FileName from '../../file-name';
import Filter from './filter';
import getAssetsById from './utils/get-assets-by-id';
import mergeAssetsById from './utils/merge-assets-by-id';
import processAssets from './utils/process-assets';
import { FILTER_SHOW_CHANGED } from './constants';
import enhance from './container';
import styles from './styles.css';

const getHeaders = entries => ([
  {
    text: '',
    options: {
      width: '1rem',
    },
  },
  'Files',
  ...entries.map(({ label }) => ({
    text: label,
    options: {
      align: 'right',
      width: '100px',
    },
  })),
]);

const getRow = ({ key, data, entries }) => ({
  options: {
    classNames: {
      [styles.unchanged]: !data.changed,
      [styles.added]: data.added,
      [styles.deleted]: data.deleted,
    },
  },
  cells: [
    <EntryFlag added={data.added} deleted={data.deleted} />,
    <FileName name={key} />,

    ...entries.map(entry => (
      entry && <Metric value={entry.size} formatter={fileSize} />
    )),
  ],

});

const getRows = (entries, show) => {
  const assetsById = entries.map(({ data }) => getAssetsById(data.assets));
  const data = processAssets(mergeAssetsById(assetsById));

  return sortBy(
    data.filter(o => show === FILTER_SHOW_CHANGED ? o.data.changed : true),
    o => [!o.data.changed, o.key],
  )
    .map(getRow);
};

const Assets = ({ entries, show, setShow }) => (
  <div>
    <Filter
      active={show}
      onChange={setShow}
    />
    <Table
      headers={getHeaders(entries)}
      rows={getRows(entries, show)}
    />
  </div>
);

Assets.defaultProps = {
  entries: [],
};

Assets.propTypes = {
  entries: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  show: PropTypes.string.isRequired,
  setShow: PropTypes.func.isRequired,
};


export default enhance(Assets);
