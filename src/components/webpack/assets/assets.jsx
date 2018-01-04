import PropTypes from 'prop-types';

import { fileSize } from '../../../config/metrics';
import Metric from '../../metric';
import Table from '../../table';

const resolveAssetSource = name =>
  name.replace(/[a-f0-9]{5,32}\./, '');

const getHeaders = entries => ([
  'Filename',
  ...entries.map(({ label }) => label),
]);

const getRows = (entries) => {
  const results = entries.map(({ data }) =>
    data.assets.map(({ name, size }) => ({
      id: resolveAssetSource(name),
      name,
      size,
    })),
  );

  // TODO

  return results[0].map(asset => ({
    header: asset.id,
    cells: [
      (<Metric value={asset.size} formatter={fileSize} />),
    ],
  }));
};

const Assets = ({ entries }) => (
  <Table
    headers={getHeaders(entries)}
    rows={getRows(entries)}
  />
);

Assets.defaultProps = {
  entries: [],
};

Assets.propTypes = {
  entries: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};


export default Assets;
