import PropTypes from 'prop-types';

import locale from './locale.json';
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
      <input
        class={styles.input}
        type="url"
        name="url"
        id="url"
        placeholder={locale.placeholder}
        required
      />
      <button type="submit" class={styles.button}>
        {locale.submit}
      </button>
    </form>
  );
};

Add.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Add;
