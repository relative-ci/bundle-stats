import { get } from 'lodash';

const getMeta = (res = {}, metaMap = {}) =>
  Object.entries(metaMap).reduce((aggregator, [name, key]) => ({
    ...aggregator,
    [name]: get(res, key),
  }), {});

export default getMeta;
