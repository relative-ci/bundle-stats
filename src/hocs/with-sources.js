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

const syncSearchParams = (sources) => {
  const params = new URLSearchParams('');

  sources.forEach(({ url }) => params.append('url', url));

  const newSearch = params.toString();
  const { pathname } = window.location;
  const newUrl = `${pathname}${(newSearch && `?${newSearch}`) || ''}`;

  window.history.pushState({}, '', newUrl);
};

const getInitialUrls = () => {
  const query = new URLSearchParams(window.location.search);
  return query.getAll('url');
};


const getDefaultSource = url => ({
  url,
  resolvedUrl: resolveUrl(url),
  error: false,
  loading: false,
  fetched: false,
  res: {},
});

const addSource = ({ sources, setSources }) => (url) => {
  const newSources = [
    ...sources,
    getDefaultSource(url),
  ];
  setSources(newSources);
  syncSearchParams(newSources);
};

const removeSource = ({ sources, setSources }) => (sourceIndex) => {
  const newSources = [
    ...sources.slice(0, sourceIndex),
    ...sources.slice(sourceIndex + 1),
  ];
  setSources(newSources);
  syncSearchParams(newSources);
};

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
  props.sources.forEach(({ resolvedUrl, loading, fetched }, index) => {
    if (loading || fetched) {
      return;
    }

    props.updateSource(index, {
      loading: true,
    });

    fetch(resolvedUrl)
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
