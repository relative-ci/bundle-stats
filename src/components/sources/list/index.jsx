import PropTypes from 'prop-types';

import Source from '../source';
import locale from './locale.json';
import styles from './styles.css';

const List = ({ sources, removeSource }) => {
  const getHandleRemoveSource = index => (event) => {
    event.preventDefault();
    removeSource(index);
  };

  return (
    <div class={styles.root}>
      {sources.length > 0 && sources.map((source, index) => (
        <Source
          className={styles.item}
          title={`Run #${index}`}
          url={source.url}
          error={source.error}
          loading={source.loading}
          onRemoveClick={getHandleRemoveSource(index)}
        />
      ))}

      {sources.length === 0 && (
        <p class={styles.empty}>
          {locale.empty}
        </p>
      )}
    </div>
  );
};

List.defaultProps = {
  sources: [],
};

List.propTypes = {
  sources: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  removeSource: PropTypes.func.isRequired,
};

export default List;
