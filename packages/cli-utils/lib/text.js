"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLI_NO_BASELINE = exports.CLI_MULTIPLE_STATS = exports.CLI_NO_COMPARE_MODE = exports.PLUGIN_BASELINE_MISSING_WARN = exports.CLI_BASELINE_MISSING_WARN = void 0;
const CLI_BASELINE_MISSING_WARN = 'Missing baseline stats, see "--baseline" option.';
exports.CLI_BASELINE_MISSING_WARN = CLI_BASELINE_MISSING_WARN;
const PLUGIN_BASELINE_MISSING_WARN = 'Missing baseline stats, see "baseline" option.';
exports.PLUGIN_BASELINE_MISSING_WARN = PLUGIN_BASELINE_MISSING_WARN;
const CLI_NO_COMPARE_MODE = 'Not in compare mode (see --compare).';
exports.CLI_NO_COMPARE_MODE = CLI_NO_COMPARE_MODE;
const CLI_MULTIPLE_STATS = 'Multiple stat files already set.';
exports.CLI_MULTIPLE_STATS = CLI_MULTIPLE_STATS;
const CLI_NO_BASELINE = 'Not a baseline job (see --baseline).';
exports.CLI_NO_BASELINE = CLI_NO_BASELINE;