import cx from 'classnames';
import PropTypes from 'prop-types';
import { last } from 'lodash';

import locale from './locale.json';
import styles from './styles.css';

const displayUrl = url => last(url.split('/'));

const List = ({ sources, removeSource }) => (
  <div class={styles.root}>
    {sources.length > 0 && sources.map((source, index) => {
      const sourceClassName = cx(styles.source, {
        [styles.error]: source.error,
        [styles.loading]: source.loading,
      });

      return (
        <div
          class={sourceClassName}
          title={source.url}
        >
          <h2 class={styles.title}>
            Run #{index}
          </h2>
          <code class={styles.url}>
            {displayUrl(source.url)}
          </code>
          {source.error && (
            <div class={styles.errorMessage}>
              {source.error}
            </div>
          )}

          <button
            onClick={() => removeSource(index)}
            type="button"
            class={styles.remove}
          >
            x
          </button>
        </div>
      );
    })}

    {sources.length === 0 && (
      <p class={styles.empty}>
        {locale.empty}
      </p>
    )}
  </div>
);

List.defaultProps = {
  sources: [],
};

List.propTypes = {
  sources: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  removeSource: PropTypes.func.isRequired,
};

export default List;
