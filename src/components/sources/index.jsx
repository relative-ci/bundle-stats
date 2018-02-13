import PropTypes from 'prop-types';

import enhance from './container';
import Add from './add';
import List from './list';
import styles from './styles.css';

const Sources = ({
  sources,
  addSource,
  removeSource,
}) => (
  <div class={styles.root}>
    <List
      sources={sources}
      removeSource={removeSource}
    />
    <Add onSubmit={addSource} />
  </div>
);

Sources.defaultProps = {
  sources: [],
};

Sources.propTypes = {
  sources: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  addSource: PropTypes.func.isRequired,
  removeSource: PropTypes.func.isRequired,
};

export default enhance(Sources);
