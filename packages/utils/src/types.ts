import * as constants from './constants';

/** Insight v2 structure */
export interface Insight {
  type: constants.InsightType;
  message: {
    /** Insight message text format */
    text: string;
    /** Insight message markdown format */
    md: string;
  };
  /** Insight specific data */
  data: unknown;
}
