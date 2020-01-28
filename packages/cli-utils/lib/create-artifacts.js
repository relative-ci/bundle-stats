"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createArtifacts = exports.createJSONArtifact = exports.createHTMLArtifact = void 0;

var _fsExtra = require("fs-extra");

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const templateFilepath = require.resolve('@bundle-stats/html-templates');

const createHTMLArtifact = jobs => {
  const template = (0, _fsExtra.readFileSync)(templateFilepath, 'utf-8');
  return template.replace(_constants.INITIAL_DATA_PATTERN, `window.__INITIAL_DATA__ = ${JSON.stringify(jobs)}`);
};

exports.createHTMLArtifact = createHTMLArtifact;

const createJSONArtifact = (_, report) => JSON.stringify(report, null, 2);

exports.createJSONArtifact = createJSONArtifact;
const REPORT_HANDLERS = {
  [_constants.OUTPUT_TYPE_HTML]: createHTMLArtifact,
  [_constants.OUTPUT_TYPE_JSON]: createJSONArtifact
};

const createArtifacts = (jobs, report, options) => {
  const types = [...(options.html ? ['html'] : []), ...(options.json ? ['json'] : [])];
  return types.reduce((agg, type) => _objectSpread({}, agg, {
    [type]: {
      output: REPORT_HANDLERS[type](jobs, report),
      filename: `${_constants.OUTPUT_FILENAME}.${type}`
    }
  }), {});
};

exports.createArtifacts = createArtifacts;