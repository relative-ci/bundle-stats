import cx from 'classnames';
import PropTypes from 'prop-types';

import locale from './locale.json';
import styles from './styles.css';

const Source = (props) => {
  const {
    className,
    title,
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
        {title}
      </h2>

      <a
        class={styles.url}
        href={url}
        target="_blank"
      >
        {url}
      </a>

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
      />
    </div>
  );
};

Source.defaultProps = {
  className: '',
  error: '',
  loading: false,
};

Source.propTypes = {
  /** Adopted child class */
  className: PropTypes.string,

  /** Source title */
  title: PropTypes.string.isRequired,

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
