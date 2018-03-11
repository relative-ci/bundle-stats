import chalk from 'chalk';
import { table, getBorderCharacters } from 'table';

import getMetric from '../../../web/src/utils/metrics';

const renderMetric = ({ value, formatter, children }) =>
  `${formatter(value)} ${children}`;

const renderDelta = ({ value, displayValue, biggerIsBetter }) => {
  const positiveChange = (biggerIsBetter && value > 0) || (!biggerIsBetter && value < 0);

  const color = value === 0 ?
    chalk.gray :
    positiveChange ? chalk.green : chalk.red;

  return `(${color(displayValue)})`;
};

const getColumns = runs => [
  {},
  ...runs.map(run => ({
    alignment: 'right'
  })),
];

const generateRowCells = metric => (run, index) => {
  const delta = index !== 0 ? renderDelta({
    value: run.delta,
    displayValue: run.displayDelta,
    biggerIsBetter: metric.biggerIsBetter,
  }) : '';

  const displayValue = run.value ? renderMetric({
    value: run.value,
    formatter: metric.formatter,
    children: delta,
  }) : '-';

  return displayValue;
};

const getHeaderCells = runs => [
  '',
  ...runs.map(({ label }) => chalk.bold(label)),
];

const getRows = rows => rows.map(({
  key,
  type,
  changed,
  runs,
}) => {
  const metric = getMetric(key, type);

  return [
    // Metric name
    metric.label,

    // Metric run values
    ...runs.map(generateRowCells(metric)),
  ];
});

const metricsTable = ({ runs, rows }) => {
  const options = {
    border: getBorderCharacters('norc'),
    columns: getColumns(runs),
  };

  const data = [
    getHeaderCells(runs),
    ...getRows(rows)
  ];

  return table(data, options);
};

export default metricsTable;
