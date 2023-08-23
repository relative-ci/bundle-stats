const { merge } = require('webpack-merge');

const getDefineConfig = require('../webpack/define');
const settings = require('../../settings');
const getResolveConfig = require('../webpack/resolve');

module.exports = ({ config }) => merge(config, getDefineConfig(settings), getResolveConfig());
