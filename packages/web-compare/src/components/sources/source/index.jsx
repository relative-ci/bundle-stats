import cx from 'classnames';
import PropTypes from 'prop-types';

import locale from './locale.json';
import styles from './styles.css';

const renderMeta = (meta = {}) => (
  <div class={styles.meta}>
    {Object.entries(meta).map(([key, value]) => (
      <p class={styles.entry}>
        <span class={styles.entryKey}>
          {key}
        </span>
        <span class={styles.entryValue}>
          {value}
        </span>
      </p>
    ))}
  </div>
);

const Source = (props) => {
  const {
    className,
    run,
    url,
    error,
    loading,
    onRemoveClick,
  } = props;

  const rootClassName = cx(styles.root, className, {
    [styles.error]: error,
    [styles.loading]: loading,
  });

  return (
    <div class={rootClassName}>
      <h2 class={styles.title}>
        {run.label}
      </h2>

      <a
        class={styles.url}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>

      {renderMeta(run.meta)}

      {error && (
        <div class={styles.errorMessage}>
          {error}
        </div>
      )}

      <button
        onClick={onRemoveClick}
        type="button"
        class={styles.remove}
        title={locale.remove}
      >
        remove
      </button>
    </div>
  );
};

Source.defaultProps = {
  className: '',
  run: {},
  error: '',
  loading: false,
};

Source.propTypes = {
  /** Adopted child class */
  className: PropTypes.string,

  /** Run data */
  run: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  /** Source url */
  url: PropTypes.string.isRequired,

  /** Source error */
  error: PropTypes.string,

  /** Source loading flag */
  loading: PropTypes.bool,

  /** Remove button handler */
  onRemoveClick: PropTypes.func.isRequired,
};

export default Source;
