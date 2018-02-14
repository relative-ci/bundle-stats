import {
  compose,
  withProps,
  withState,
  withHandlers,
} from 'recompose';

import {
  isGistUrl,
  getGistRawUrl,
} from '../utils/gist';

const resolveUrl = (url) => {
  if (isGistUrl(url)) {
    return getGistRawUrl(url);
  }

  return url;
};

const getInitialUrls = () => {
  const query = new URLSearchParams(window.location.search);
  return query.getAll('url');
};


const getDefaultSource = url => ({
  url: resolveUrl(url),
  error: false,
  loading: false,
  fetched: false,
  res: {},
});

const addSource = ({ sources, setSources }) => url =>
  setSources([
    ...sources,
    getDefaultSource(url),
  ]);

const removeSource = ({ sources, setSources }) => sourceIndex =>
  setSources([
    ...sources.slice(0, sourceIndex),
    ...sources.slice(sourceIndex + 1),
  ]);

const updateSource = ({ sources, setSources }) => (sourceIndex, payload) =>
  setSources([
    ...sources.slice(0, sourceIndex),
    {
      ...sources[sourceIndex],
      ...payload,
    },
    ...sources.slice(sourceIndex + 1),
  ]);

const fetchSources = (props) => {
  props.sources.forEach(({ url, loading, fetched }, index) => {
    if (loading || fetched) {
      return;
    }

    props.updateSource(index, {
      loading: true,
    });

    fetch(url)
      .then(res => res.json())
      .then(res => props.updateSource(index, {
        loading: false,
        fetched: true,
        res,
      }))
      .catch(err => props.updateSource(index, {
        error: err.message,
      }));
  });
};

const enhance = () => compose(
  withProps({
    initialUrls: getInitialUrls(),
  }),
  withState(
    'sources',
    'setSources',
    ({ initialUrls }) => initialUrls.map(getDefaultSource),
  ),
  withHandlers({
    addSource,
    removeSource,
    updateSource,
  }),
  BaseComponent => (props) => {
    fetchSources(props);
    return BaseComponent(props);
  },
);

export default enhance;
