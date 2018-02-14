import PropTypes from 'prop-types';

import Add from './add';
import List from './list';
import styles from './styles.css';

const Sources = ({
  sources,
  onAddFormSubmit,
  onSourceRemove,
}) => (
  <div class={styles.root}>
    <List
      sources={sources}
      removeSource={onSourceRemove}
    />
    <Add onSubmit={onAddFormSubmit} />
  </div>
);

Sources.defaultProps = {
  sources: [],
};

Sources.propTypes = {
  sources: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  onAddFormSubmit: PropTypes.func.isRequired,
  onSourceRemove: PropTypes.func.isRequired,
};

export default Sources;
