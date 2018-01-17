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

const generateEntryHeaderCells = (run, index) => {
  const columns = [
    // Value column
    {
      text: run.label || `#${index}`,
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

const generateHeadersData = runs => ([
  // Filename column
  {
    text: 'Files',
    options: {
      classNames: styles.filename,
    },
  },

  // Entries columns
  ...flatten(map(runs, generateEntryHeaderCells)),
]);

const generateEntryRowCells = (run, index) => {
  const cells = [
    // Entry value
    <Metric value={run.value} formatter={fileSize} />,

    // Delta for all entries except the first one
    index > 0 ?
      (
        <Delta
          value={run.delta}
          displayValue={run.displayDelta}
          biggerIsBetter={false}
        />
      ) :
      null,
  ];

  return filter(cells, i => !!i);
};

const generateRowData = ({ key, data, runs }) => ({
  // Row options
  options: {
    classNames: {
      [styles.unchanged]: !data.changed,
    },
  },

  cells: [
    <FileName name={key} />,

    ...(flatten(map(runs, generateEntryRowCells))),
  ],
});

const generateRowsData = rows =>
  rows.map(generateRowData);

const Assets = (props) => {
  const {
    runs,
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
        headers={generateHeadersData(runs)}
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
