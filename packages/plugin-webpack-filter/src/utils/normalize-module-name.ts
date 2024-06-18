// Match inline encoded query param "source":"..."
const VANILLA_EXTRACT_PATTERN = /\?%7B(.*)%22source%22%3A%22(.*?)%22/;

export function normalizeModuleName(moduleName: string): string {
  if (VANILLA_EXTRACT_PATTERN.test(moduleName)) {
    return moduleName.replace(VANILLA_EXTRACT_PATTERN, '?%7B$1%22source%22%3A%22...%22');
  }

  return moduleName;
}
