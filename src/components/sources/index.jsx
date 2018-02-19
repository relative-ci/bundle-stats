import PropTypes from 'prop-types';

import Add from './add';
import List from './list';
import Example from './example';
import styles from './styles.css';

const Sources = ({
  sources,
  exampleUrls,
  exampleText,
  onAddFormSubmit,
  onSourceRemove,
  addSources,
}) => (
  <div class={styles.root}>
    <List
      sources={sources}
      removeSource={onSourceRemove}
    />
    <Add onSubmit={onAddFormSubmit} />

    {sources.length === 0 && exampleUrls.length > 0 && (
      <Example
        urls={exampleUrls}
        text={exampleText}
        onLoadClick={addSources}
      />
    )}
  </div>
);

Sources.defaultProps = {
  sources: [],
  exampleUrls: [],
  exampleText: '',
};

Sources.propTypes = {
  sources: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  onAddFormSubmit: PropTypes.func.isRequired,
  onSourceRemove: PropTypes.func.isRequired,
  exampleUrls: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  exampleText: PropTypes.string,
  addSources: PropTypes.func.isRequired,
};

export default Sources;
