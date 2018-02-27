import PropTypes from 'prop-types';
import { Component } from 'preact';
import { map } from 'lodash';
import uuid from 'uuid/v4';

import {
  isGistUrl,
  getGistRawUrl,
} from '../utils/gist';
import fetchJSON from '../utils/fetch';
import { syncUrlsToSearch } from '../utils/search-params';

const resolveUrl = (url) => {
  if (isGistUrl(url)) {
    return getGistRawUrl(url);
  }

  return url;
};

const syncSourcesWithParams = sources =>
  syncUrlsToSearch(map(sources, 'url'));

const getSourceIndexById = (sources, id) =>
  sources.findIndex(source => source.id === id);

const getDefaultSource = url => ({
  id: uuid(),
  url,
  resolvedUrl: resolveUrl(url),
  error: false,
  loading: false,
  fetched: false,
  res: {},
});

const enhance = () => (BaseComponent) => {
  class WithSources extends Component {
    defaultProps = {
      initialUrls: [],
    }

    propTypes = {
      initialUrls: PropTypes.arrayOf(PropTypes.string),
    }

    state = {
      sources: [],
    }

    addSource = (url) => {
      const source = getDefaultSource(url);

      const nextSources = [
        ...this.state.sources,
        source,
      ];

      syncSourcesWithParams(nextSources);
      this.fetchSource(source);

      this.setState({
        sources: nextSources,
      });
    }

    removeSource = (source) => {
      const { sources } = this.state;
      const index = getSourceIndexById(sources, source.id);

      const nextSources = [
        ...sources.slice(0, index),
        ...sources.slice(index + 1),
      ];

      syncSourcesWithParams(nextSources);

      this.setState({
        sources: nextSources,
      });
    }

    updateSource = (source) => {
      const { sources } = this.state;
      const index = getSourceIndexById(sources, source.id);

      const nextSources = [
        ...sources.slice(0, index),
        {
          ...sources[index],
          ...source,
        },
        ...sources.slice(index + 1),
      ];

      this.setState({
        sources: nextSources,
      });
    }

    fetchSource = (source) => {
      const { resolvedUrl } = source;

      this.updateSource({
        ...source,
        loading: true,
      });

      fetchJSON(resolvedUrl)
        .then(res => this.updateSource({
          ...source,
          loading: false,
          fetched: true,
          res,
        }))
        .catch(err => this.updateSource({
          ...source,
          loading: false,
          fetched: false,
          error: err.message,
        }));
    };

    render() {
      return (
        <BaseComponent
          sources={this.state.sources}
          addSource={this.addSource}
          removeSource={this.removeSource}
          {...this.props}
        />
      );
    }

    componentDidMount() {
      this.props.initialUrls.forEach(this.addSource);
    }
  }

  return WithSources;
};

export default enhance;
