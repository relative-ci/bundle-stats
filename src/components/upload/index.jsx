import PropTypes from 'prop-types';

import enhance from './container';
import css from './styles.css';

const Upload = props => (
  <div>
    <form
      class={css.root}
      ref={props.formRef}
    >
      <input
        class={css.input}
        type="file"
        onChange={props.onChange}
      />
      <button
        class={css.button}
        type="button"
      >
        Upload
      </button>
    </form>

    {props.children(props.file)}
  </div>
);

Upload.defaultProps = {
  children: () => null,
  file: {},
};

Upload.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.func,
  file: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default enhance(Upload);
