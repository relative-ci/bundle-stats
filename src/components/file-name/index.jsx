import PropTypes from 'prop-types';

import fileTypes from '../../config/file-types';
import styles from './styles.css';

const getFileType = name =>
  Object.keys(fileTypes).find(typeName => name.match(fileTypes[typeName]));

const FileName = (props) => {
  const { name } = props;
  const title = `${name} [${getFileType(name)}]`;

  return (
    <span
      class={styles.root}
      title={title}
    >
      {name}
    </span>
  );
};

FileName.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FileName;
