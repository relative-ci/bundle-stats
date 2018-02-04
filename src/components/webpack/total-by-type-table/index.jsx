import { filter, flatten, map } from 'lodash';
import PropTypes from 'prop-types';

import metrics, { fileSize } from '../../../config/metrics';
import Metric from '../../metric';
import Delta from '../../delta';
import Table from '../../table';

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
    text: '',
    options: {
      classNames: styles.metricName,
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

const generateRowData = ({ key, changed, runs }) => ({
  // Row options
  options: {
    classNames: {
      [styles.unchanged]: !changed,
    },
  },

  cells: [
    metrics.webpack[key].label,

    ...(flatten(map(runs, generateEntryRowCells))),
  ],
});

const generateRowsData = rows =>
  rows.map(generateRowData);

const TotalByTypeTable = ({ runs, rows }) => (
  <Table
    headers={generateHeadersData(runs)}
    rows={generateRowsData(rows)}
  />
);

TotalByTypeTable.defaultProps = {
  runs: [],
  rows: [],
};

TotalByTypeTable.propTypes = {
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default enhance(TotalByTypeTable);
