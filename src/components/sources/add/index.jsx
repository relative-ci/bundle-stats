import PropTypes from 'prop-types';

import styles from './styles.css';


const Add = ({ onSubmit }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    onSubmit(form.url.value);

    form.reset();
  };

  return (
    <form class={styles.root} onSubmit={handleFormSubmit}>
      <label
        class={styles.label}
        for="url"
      >
        URL
      </label>
      <input
        class={styles.input}
        type="url"
        name="url"
        id="url"
        required
      />
      <button class={styles.button}>
        Load
      </button>
    </form>
  );
};

Add.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Add;
