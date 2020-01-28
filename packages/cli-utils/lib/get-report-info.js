"use strict";

var _lodash = require("lodash");

var _boxen = _interopRequireDefault(require("boxen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.getReportInfo = report => {
  const info = (0, _lodash.get)(report, 'insights.webpack.assetsSizeTotal.data.text');

  if (!info) {
    return '';
  }

  return (0, _boxen.default)(info);
};