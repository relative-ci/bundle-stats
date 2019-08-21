import PropTypes from 'prop-types';
import cx from 'classnames';

import locale from './locale.json';
import styles from './styles.css';

const Add = ({ className, onSubmit, placeholder }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    onSubmit(form.url.value);

    form.reset();
  };

  return (
    <form class={cx(styles.root, className)} onSubmit={handleFormSubmit}>
      <input
        class={styles.input}
        type="url"
        name="url"
        id="url"
        placeholder={placeholder || locale.placeholder}
        required
      />
      <button type="submit" class={styles.button}>
        {locale.submit}
      </button>
    </form>
  );
};

Add.defaultProps = {
  className: '',
  placeholder: '',
};

Add.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Add;
