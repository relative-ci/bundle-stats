import PropTypes from 'prop-types';

import styles from './styles.css';

/* eslint-disable jsx-a11y/label-has-for */
const Label = ({ children }) => (
  <label
    class={styles.label}
    for="url"
  >
    {children}
  </label>
);

Label.propTypes = {
  children: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

const Add = ({ onSubmit }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    onSubmit(form.url.value);

    form.reset();
  };

  return (
    <form class={styles.root} onSubmit={handleFormSubmit}>
      <Label>URL</Label>
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
