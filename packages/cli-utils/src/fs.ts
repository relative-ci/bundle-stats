import { createReadStream } from 'fs';
import { parser } from 'stream-json';
import chain from 'stream-chain';

export const readJSONStream = <T = unknown>(filepath: string): Promise<T> => {
  const pipeline = chain([createReadStream(filepath), parser()]);

  return new Promise((fulfill) => {
    pipeline.on('done', (data) => fulfill(data.current));
  });
};
