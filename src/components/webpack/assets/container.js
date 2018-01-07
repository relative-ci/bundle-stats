import { withState } from 'recompose';

import { FILTER_SHOW_CHANGED } from './constants';

const enhance = withState('show', 'setShow', FILTER_SHOW_CHANGED);

export default enhance;
