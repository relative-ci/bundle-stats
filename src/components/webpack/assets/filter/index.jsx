import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  FILTER_SHOW_ALL,
  FILTER_SHOW_CHANGED,
} from '../constants';
import styles from './styles.css';

const getButtonClassNames = (active, filter) => cx(styles.button, {
  [styles.active]: active === filter,
});

const Filter = (props) => {
  const {
    active,
    onChange,
  } = props;

  return (
    <div class={styles.root}>
      <ul class={styles.list}>
        <li class={styles.item}>
          <button
            class={getButtonClassNames(active, FILTER_SHOW_ALL)}
            onClick={() => onChange(FILTER_SHOW_ALL)}
            type="button"
          >
            All files
          </button>
        </li>
        <li class={styles.item}>
          <button
            class={getButtonClassNames(active, FILTER_SHOW_CHANGED)}
            onClick={() => onChange(FILTER_SHOW_CHANGED)}
            type="button"
          >
            Changed files
          </button>
        </li>
      </ul>
    </div>
  );
};

Filter.propTypes = {
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
