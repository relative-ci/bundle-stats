import PropTypes from 'prop-types';

import Add from './add';
import List from './list';
import styles from './styles.css';

const Sources = ({
  sources,
  onAddFormSubmit,
  onSourceRemove,
  example,
}) => (
  <div class={styles.root}>
    <List
      sources={sources}
      removeSource={onSourceRemove}
    />
    <Add onSubmit={onAddFormSubmit} />

    {sources.length === 0 && example && (
      <div class={styles.example}>
        {example()}
      </div>
    )}
  </div>
);

Sources.defaultProps = {
  sources: [],
  example: null,
};

Sources.propTypes = {
  sources: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  onAddFormSubmit: PropTypes.func.isRequired,
  onSourceRemove: PropTypes.func.isRequired,
  example: PropTypes.func,
};

export default Sources;
