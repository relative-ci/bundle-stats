import PropTypes from 'prop-types';

import styles from './styles.css';

const EntryFlag = (props) => {
  const {
    added,
    deleted,
  } = props;

  return (
    <span>
      {added &&
        <abbr
          class={styles.added}
          title="Added"
        >
          A
        </abbr>
      }
      {deleted &&
        <abbr
          class={styles.deleted}
          title="Deleted"
        >
          D
        </abbr>
      }
    </span>
  );
};

EntryFlag.propTypes = {
  added: PropTypes.boolean,
  deleted: PropTypes.boolean,
};

EntryFlag.defaultProps = {
  added: false,
  deleted: false,
};

export default EntryFlag;
