import { compareMetrics } from '../report';
import { selectors } from './selectors';

export const compare = (jobs) => compareMetrics(jobs, selectors);
