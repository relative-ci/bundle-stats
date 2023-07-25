const path = require('path');
const { merge } = require('webpack-merge');

const getDefineConfig = require('../../../../build/configs/define');
const getResolveConfig = require('../../../../build/configs/resolve');
const settings = require('../../settings');

module.exports = ({ config }) =>
  merge(config, getDefineConfig(settings), getResolveConfig(settings));
