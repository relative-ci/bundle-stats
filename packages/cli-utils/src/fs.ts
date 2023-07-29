import { createReadStream } from 'fs';
import { parser } from 'stream-json';
import { chain } from 'stream-chain';
import Asm from 'stream-json/Assembler';

export const readJSONStream = <T = unknown>(filepath: string): Promise<T> => {
  const pipeline = chain([createReadStream(filepath), parser()]);
  const asm = Asm.connectTo(pipeline);

  return new Promise((fulfill) => {
    asm.on('done', (data) => fulfill(data.current));
  });
};
