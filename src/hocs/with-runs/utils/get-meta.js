import { get } from 'lodash';

const getMeta = (res = {}, metaMap = {}) => Object.entries(metaMap).reduce((agg, current) => {
  const [name, key] = current;

  return {
    ...agg,
    [name]: get(res, key),
  };
}, {});

export default getMeta;
