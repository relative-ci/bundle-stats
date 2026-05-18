#!/usr/bin/env node

// eslint-disable-next-line import/extensions
const { cli } = require('..');
const packageInfo = require('../package.json');

cli(packageInfo);
