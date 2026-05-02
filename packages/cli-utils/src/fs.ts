import { createReadStream } from 'fs';
import { parser } from 'stream-json';
// eslint-disable-next-line import/extensions
import Assembler from 'stream-json/assembler.js';
import { chain } from 'stream-chain';

export const readJSONStream = <T = unknown>(filepath: string): Promise<T> => {
  const pipeline = chain([createReadStream(filepath), parser()]);
  const asm = Assembler.connectTo(pipeline);

  return new Promise((fulfill) => {
    asm.on('done', (data) => fulfill(data.current));
  });
};
