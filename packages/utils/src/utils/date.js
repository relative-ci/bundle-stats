/* global navigator */
export const formatDate = (value) => {
  const date = typeof value === 'string' ? new Date(value) : value;

  return new Intl.DateTimeFormat(navigator.languages || [], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (value) => {
  const date = typeof value === 'string' ? new Date(value) : value;

  return new Intl.DateTimeFormat(navigator.languages || [], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};
