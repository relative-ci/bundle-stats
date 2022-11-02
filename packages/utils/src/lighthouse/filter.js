import pick from 'lodash/pick';

/**
 * Filter Lightouse source file
 *
 * @param {Object} source
 * @return {import('../constants').LighthouseSource}
 */
export const filter = (source) => {
  // filter meta data
  const meta = pick(source, ['lighthouseVersion', 'fetchTime', 'requestedUrl']);

  // filter categories data
  const categories = Object.entries(source.categories).reduce(
    (agg, [categoryId, categoryData]) => ({
      ...agg,
      [categoryId]: pick(categoryData, ['score']),
    }),
    {},
  );

  // filter audits
  const audits = Object.entries(source.audits).reduce(
    (agg, [auditId, auditData]) => ({
      ...agg,
      [auditId]: pick(auditData, ['score', 'numericValue']),
    }),
    {},
  );

  return {
    ...meta,
    categories,
    audits,
  };
};
