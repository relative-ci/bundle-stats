import PropTypes from 'prop-types';
import { filter, flatten, map } from 'lodash';

import { fileSize } from '../../../config/metrics';
import Metric from '../../metric';
import Table from '../../table';
import FileName from '../../file-name';
import Delta from '../../delta';
import Filter from './filter';
import enhance from './container';
import styles from './styles.css';

const generateEntryHeaderCells = (entry, index) => {
  const columns = [
    // Value column
    {
      text: entry.label || `#${index}`,
      options: {
        classNames: styles.value,
      },
    },

    // Delta column for all entries except the first one
    index > 0 ?
      {
        options: {
          classNames: styles.delta,
        },
      } :
      null,
  ];

  return filter(columns, i => !!i);
};

const generateHeadersData = entries => ([
  // Filename column
  {
    text: 'Files',
    options: {
      classNames: styles.filename,
    },
  },

  // Entries columns
  ...flatten(map(entries, generateEntryHeaderCells)),
]);

const generateEntryRowCells = (entry, index) => {
  const cells = [
    // Entry value
    <Metric value={entry.value} formatter={fileSize} />,

    // Delta for all entries except the last one
    index > 0 ?
      <Delta value={entry.delta} biggerIsBetter={false} /> :
      null,
  ];

  return filter(cells, i => !!i);
};

const generateRowData = ({ key, data, entries }) => ({
  // Row options
  options: {
    classNames: {
      [styles.unchanged]: !data.changed,
    },
  },

  cells: [
    <FileName name={key} />,

    ...(flatten(map(entries, generateEntryRowCells))),
  ],
});

const generateRowsData = rows =>
  rows.map(generateRowData);

const Assets = (props) => {
  const {
    entries,
    rows,
    show,
    setShow,
  } = props;

  return (
    <div>
      <Filter
        active={show}
        onChange={setShow}
      />
      <Table
        headers={generateHeadersData(entries)}
        rows={generateRowsData(rows, show)}
      />
    </div>
  );
};

Assets.defaultProps = {
  entries: [],
  rows: [],
};

Assets.propTypes = {
  entries: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  show: PropTypes.string.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default enhance(Assets);
