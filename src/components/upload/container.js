import { compose, withProps, withState, withHandlers } from 'recompose';

const readFile = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const { result } = event.target;
      let content = {};

      try {
        content = JSON.parse(result);
      } catch (e) {
        console.error('Error parsing the file');
        reject(e);
      }

      resolve(content);
    };

    reader.readAsBinaryString(file);
  });

const enhance = compose(
  withState('file', 'setFile'),
  withProps({
    form: null,
  }),
  withHandlers({
    formRef: props => (form) => {
      props.form = form;
    },
    onChange: props => (event) => {
      const { files } = event.target;

      console.log(props);

      Object.keys(files).forEach(key => (
        readFile(files[key]).then(props.setFile)
      ));

      if (props.form && props.form.reset) {
        props.form.reset();
      }
    },
  }),
);

export default enhance;
