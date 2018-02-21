import PropTypes from 'prop-types';

import { getUrlParams } from '../utils/search-params';

const Route = (props) => {
  const { component: RouteComponent, ...restProps } = props;
  const urls = getUrlParams();

  return <RouteComponent initialUrls={urls} {...restProps} />;
};

Route.propTypes = {
  /* Route component */
  component: PropTypes.node.isRequired,
};

export default Route;
