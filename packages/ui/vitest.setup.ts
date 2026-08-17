// TODO: remove once the remaining `defaultProps` usages are migrated to default parameters
const IGNORED_CONSOLE_ERROR_PATTERNS = [
  /Support for defaultProps will be removed from function components/,
  /Invalid prop/,
  /Failed %s type/,
  /React does not recognize the/,
  /Each child in a list/,
  /Encountered two children/,
  /forwardRef render functions/,
];

const originalConsoleError = console.error;

console.error = (...args: unknown[]) => {
  const isIgnored = args.some(
    (arg) =>
      typeof arg === 'string' &&
      IGNORED_CONSOLE_ERROR_PATTERNS.some((pattern) => pattern.test(arg)),
  );

  if (isIgnored) {
    return;
  }

  originalConsoleError(...args);
};
