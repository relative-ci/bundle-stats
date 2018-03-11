import { route } from 'preact-router';
import { lifecycle } from 'recompose';

const enhance = lifecycle({
  componentWillMount() {
    route(this.props.to, true);
  },
});

const Redirect = () => null;

export default enhance(Redirect);
