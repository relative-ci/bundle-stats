import PropTypes from 'prop-types';

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
    text: 'Before',
    options: {
      align: 'right',
    },
  },
  {
    options: {
      classNames: styles.delta,
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

    <Metric value={entries[0] && entries[0].size} formatter={fileSize} />,
    <Metric value={entries[1] && entries[1].size} formatter={fileSize} />,
    <Delta value={entries[1].delta} biggerIsBetter={false} />,
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
