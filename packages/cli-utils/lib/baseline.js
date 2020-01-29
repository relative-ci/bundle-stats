"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeBaseline = exports.readBaseline = exports.getBaselineStatsFilepath = void 0;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = require("fs-extra");

var _findCacheDir = _interopRequireDefault(require("find-cache-dir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASELINE_STATS_DIR = (0, _findCacheDir.default)({
  name: 'bundle-stats'
});
const BASELINE_STATS_BASE = 'baseline.json';

const getBaselineStatsFilepath = from => {
  if (!from) {
    return _path.default.join(BASELINE_STATS_DIR, BASELINE_STATS_BASE);
  }

  return _path.default.join(_path.default.relative(from, BASELINE_STATS_DIR), BASELINE_STATS_BASE);
};

exports.getBaselineStatsFilepath = getBaselineStatsFilepath;

const readBaseline = from => (0, _fsExtra.readJSON)(getBaselineStatsFilepath(from));

exports.readBaseline = readBaseline;

const writeBaseline = data => (0, _fsExtra.outputJSON)(getBaselineStatsFilepath(), data);

exports.writeBaseline = writeBaseline;