import { createReadStream } from 'fs';
import { writeFile, stat } from 'fs/promises';
import { parser } from 'stream-json';
import { chain } from 'stream-chain';
import Asm from 'stream-json/Assembler';

export const readJSONStream = async <T = unknown>(filepath: string): Promise<T> => {
  // Check if the file exists and throw error before creating a stream
  await stat(filepath);

  const readStream = createReadStream(filepath);
  const pipeline = chain([readStream, parser()]);
  const asm = Asm.connectTo(pipeline);

  return new Promise((resolve, reject) => {
    asm.on('done', (data) => {
      if (data.current) {
        resolve(data.current);
      } else {
        reject(new Error('Invalid JSON file'));
      }
    });
  });
};

export async function writeJSON(filepath: string, data: Record<string, unknown>): Promise<void> {
  return writeFile(filepath, JSON.stringify(data));
}
