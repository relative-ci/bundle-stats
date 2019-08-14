import PropTypes from 'prop-types';

import Source from '../source';
import styles from './styles.css';

const List = ({ sources, runs, removeSource }) => {
  const getHandleRemoveSource = (index) => (event) => {
    event.preventDefault();
    removeSource(index);
  };

  return (
    <div class={styles.root}>
      {sources.length > 0 && sources.map((source, index) => (
        <Source
          className={styles.item}
          url={source.url}
          error={source.error}
          loading={source.loading}
          run={runs[index]}
          onRemoveClick={getHandleRemoveSource(source)}
        />
      ))}
    </div>
  );
};

List.defaultProps = {
  sources: [],
  runs: [],
};

List.propTypes = {
  sources: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  removeSource: PropTypes.func.isRequired,
};

export default List;
