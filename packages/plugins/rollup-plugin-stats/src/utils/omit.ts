export function omit<D extends object, K extends keyof D = keyof D>(
  data: D,
  keys: K[]
): Omit<D, K> {
  const result = {} as D;
  const objectKeys = Object.keys(data) as Array<K>;

  objectKeys.forEach((key) => {
    if (!keys.includes(key)) {
      result[key] = data[key];
    }
  });

  return result;
}
