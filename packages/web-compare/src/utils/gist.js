const GIST_RAW_ORIGIN = 'https://gist.githubusercontent.com/';
const GIST_PATTERN = new RegExp('^https://gist.github.com/');

export const getGistRawUrl = (gistUrl) => {
  const url = new URL(gistUrl);
  const [user, gistId, revisionId] = url.pathname.split('/').slice(1);

  const pathname = [
    user,
    gistId,
    'raw',
    revisionId,
  ].filter((slug) => slug).join('/');

  return `${GIST_RAW_ORIGIN}${pathname}`;
};

export const isGistUrl = (url) => GIST_PATTERN.test(url);
