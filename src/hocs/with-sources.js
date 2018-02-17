import { map } from 'lodash';
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
import {
  syncUrlsToSearch,
  getUrlParams,
} from '../utils/search-params';

const resolveUrl = (url) => {
  if (isGistUrl(url)) {
    return getGistRawUrl(url);
  }

  return url;
};

const syncSearchParams = sources =>
  syncUrlsToSearch(map(sources, 'url'));


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
    initialUrls: getUrlParams(),
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
