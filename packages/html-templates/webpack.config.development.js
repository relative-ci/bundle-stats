const { merge } = require('webpack-merge');

const commonConfig = require('../../build/webpack.config.common');
const commonDevConfig = require('../../build/webpack.config.development');
const standaloneCommonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, standaloneCommonConfig, commonDevConfig);
