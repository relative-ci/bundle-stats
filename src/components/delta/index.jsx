import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.css';

const Delta = ({ value, displayValue, biggerIsBetter }) => {
  const positiveChange = (biggerIsBetter && value > 0) || (!biggerIsBetter && value < 0);

  const valueClassNames = cx(styles.value, {
    [styles.positive]: value !== 0 && positiveChange,
    [styles.negative]: value !== 0 && !positiveChange,
  });

  return (
    <span class={styles.root}>
      (<code class={valueClassNames}>{displayValue}</code>)
    </span>
  );
};

Delta.propTypes = {
  value: PropTypes.number.isRequired,
  displayValue: PropTypes.string.isRequired,
  biggerIsBetter: PropTypes.bool,
};

Delta.defaultProps = {
  biggerIsBetter: true,
};

export default Delta;

