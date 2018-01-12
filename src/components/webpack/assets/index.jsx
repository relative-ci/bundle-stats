import PropTypes from 'prop-types';
import { flatten } from 'lodash';

import { fileSize } from '../../../config/metrics';
import Metric from '../../metric';
import Table from '../../table';
import EntryFlag from '../../entry-flag';
import FileName from '../../file-name';
import Delta from '../../delta';
import Filter from './filter';
import enhance from './container';
import styles from './styles.css';

const getHeaders = () => ([
  {
    text: '',
    options: {
      classNames: styles.status,
    },
  },
  {
    text: 'Files',
    options: {
      width: '100%',
    },
  },
  {
    text: 'After',
    options: {
      align: 'right',
    },
  },
  {
    options: {
      classNames: styles.delta,
    },
  },
  {
    text: 'Before',
    options: {
      align: 'right',
    },
  },
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

    ...(flatten(entries.map(entry => ([
      <Metric value={entry && entry.size} formatter={fileSize} />,
      entry.delta
        ? <Delta value={entry.delta} biggerIsBetter={false} />
        : null,
    ])))).filter(i => !!i),
  ],
});

const getRows = data => data.map(getRow);

const Assets = ({ data, show, setShow }) => (
  <div>
    <Filter
      active={show}
      onChange={setShow}
    />
    <Table
      headers={getHeaders()}
      rows={getRows(data, show)}
    />
  </div>
);

Assets.defaultProps = {
  data: [],
};

Assets.propTypes = {
  data: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  show: PropTypes.string.isRequired,
  setShow: PropTypes.func.isRequired,
};


export default enhance(Assets);
