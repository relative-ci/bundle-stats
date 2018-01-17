const formatDataSet = metrics =>
  Object.entries(metrics).map(([key, metric]) => {
    const {
      runs,
      ...metricProps
    } = metric;

    return {
      ...metricProps,
      key,
      runs: runs.map((run) => {
        if (!run) {
          return { value: 0 };
        }

        const { size, ...runProps } = run;

        return {
          ...runProps,
          value: size,
        };
      }),
    };
  });

export default formatDataSet;
