export const wait = (timeout = 0): Promise<void> =>
  new Promise((resolve) => {
  setTimeout(() => {
    return resolve();
  }, timeout);
});
