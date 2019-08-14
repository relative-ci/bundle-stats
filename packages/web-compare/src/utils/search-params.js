const URL_PARAM_NAME = 'url';

const urlsToSearch = (urls) => {
  const params = new URLSearchParams('');
  urls.forEach((url) => params.append(URL_PARAM_NAME, url));

  const newSearch = params.toString();

  return (newSearch && `?${newSearch}`) || '';
};

export const syncUrlsToSearch = (urls) => {
  const search = urlsToSearch(urls);
  const { pathname } = window.location;

  window.history.pushState(
    {},
    '',
    `${pathname}${search}`,
  );
};

export const getUrlParams = () => {
  const query = new URLSearchParams(window.location.search);
  return query.getAll(URL_PARAM_NAME);
};
