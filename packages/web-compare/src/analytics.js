/* global __GA__ */
import GAnalytics from 'ganalytics';

if (__PRODUCTION__) {
  const ga = new GAnalytics(__GA__);
  ga.send('pageview');
}
