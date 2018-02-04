const formatDataSet = metrics =>
  Object.entries(metrics).map(([key, metric]) => {
    const {
      runs,
      ...metricProps
    } = metric;

    return {
      ...metricProps,
      key,
      runs: runs.map(run => ({
        value: run || 0,
      })),
    };
  });

export default formatDataSet;
