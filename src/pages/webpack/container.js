import {
  compose,
  lifecycle,
  withHandlers,
  withStateHandlers,
  withProps,
} from 'recompose';

const fetchUrl = url =>
  fetch(url).then(res => res.json());

const fetchSources = ({ addSource }) => urls =>
  Promise.all(urls.map(fetchUrl))
    .then(results => results.map(addSource));

const addSource = state => payload => ({
  ...state,
  sources: [...state.sources, payload],
});

const getSourceUrls = () => {
  const query = new URLSearchParams(window.location.search);
  return query.getAll('url');
};

const transformAssets = sources =>
  sources.map((source, index) => ({
    label: `Run #${index}`,
    data: source,
  }));

const enhance = compose(
  withStateHandlers({ sources: [] }, {
    addSource,
  }),

  withHandlers({
    fetchSources,
  }),

  lifecycle({
    componentDidMount() {
      const urls = getSourceUrls();

      if (urls.length > 0) {
        this.props.fetchSources(urls);
      }
    },
  }),

  withProps(({ sources }) => ({
    assets: transformAssets(sources),
  })),
);

export default enhance;
