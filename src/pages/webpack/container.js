import { compose, withHandlers, withProps, withStateHandlers } from 'recompose';

const enhance = compose(
  withStateHandlers({
    addFile: state => file => ({
      entries: []
    }),
  }),
);

export default enhance;
