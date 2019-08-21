import PropTypes from 'prop-types';
import { Container } from '@bundle-stats/ui';
import cx from 'classnames';

import Add from './add';
import List from './list';
import Example from './example';
import styles from './styles.css';

const Sources = ({
  sources,
  runs,
  exampleUrls,
  exampleText,
  addPlaceholder,
  addSource,
  removeSource,
}) => {
  const handleExamplesClick = (urls) => urls.forEach(addSource);
  const empty = Boolean(sources && sources.length === 0);
  const rootClassName = cx(styles.root, empty && styles.empty);

  return (
    <Container className={rootClassName}>
      <List
        sources={sources}
        runs={runs}
        removeSource={removeSource}
      />
      <Add
        className={styles.add}
        onSubmit={addSource}
        placeholder={addPlaceholder}
      />

      {(sources.length === 0 && exampleUrls.length > 0) && (
        <Example
          urls={exampleUrls}
          text={exampleText}
          onLoadClick={handleExamplesClick}
        />
      )}
    </Container>
  );
};

Sources.defaultProps = {
  sources: [],
  runs: [],
  exampleUrls: [],
  exampleText: '',
  addPlaceholder: '',
};

Sources.propTypes = {
  sources: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  exampleUrls: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  exampleText: PropTypes.string,
  addPlaceholder: PropTypes.string,
  addSource: PropTypes.func.isRequired,
  removeSource: PropTypes.func.isRequired,
};

export default Sources;
