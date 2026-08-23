export function round(value: number, precision = 2): number {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
}
