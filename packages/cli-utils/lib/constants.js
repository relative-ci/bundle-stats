"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIAL_DATA_PATTERN = exports.OUTPUT_FILENAME = exports.OUTPUT_TYPE_JSON = exports.OUTPUT_TYPE_HTML = void 0;
const OUTPUT_TYPE_HTML = 'html';
exports.OUTPUT_TYPE_HTML = OUTPUT_TYPE_HTML;
const OUTPUT_TYPE_JSON = 'json';
exports.OUTPUT_TYPE_JSON = OUTPUT_TYPE_JSON;
const OUTPUT_FILENAME = 'bundle-stats';
exports.OUTPUT_FILENAME = OUTPUT_FILENAME;
const INITIAL_DATA_PATTERN = /window\.__INITIAL_DATA__ = \[\]/;
exports.INITIAL_DATA_PATTERN = INITIAL_DATA_PATTERN;