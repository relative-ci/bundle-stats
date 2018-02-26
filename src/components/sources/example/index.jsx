import PropTypes from 'prop-types';

import styles from './styles.css';

const Example = ({ text, urls, onLoadClick }) => {
  const handleExamplesClick = (event) => {
    event.preventDefault();
    onLoadClick(urls);
  };

  return (
    <div class={styles.root}>
      <button
        type="button"
        class={styles.button}
        onClick={handleExamplesClick}
      >
        {text}
      </button>
    </div>
  );
};

Example.propTypes = {
  /* Button label */
  text: PropTypes.string.isRequired,
  /* JSON Url examples */
  urls: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /* Load examples handler */
  onLoadClick: PropTypes.func.isRequired,
};

export default Example;
