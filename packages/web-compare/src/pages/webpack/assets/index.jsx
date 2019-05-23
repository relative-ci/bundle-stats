import PropTypes from 'prop-types';
import {
  BundleAssets,
  Container,
} from '@relative-ci/ui';

const Assets = (props) => {
  const { jobs } = props;

  return (
    <Container>
      <BundleAssets jobs={jobs} />
    </Container>
  );
};

Assets.defaultProps = {
  jobs: [],
};

Assets.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
    rawData: PropTypes.shape({
      webpack: PropTypes.shape({
        assets: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
          size: PropTypes.number,
        })),
      }),
    }),
  })),
};

export default Assets;
