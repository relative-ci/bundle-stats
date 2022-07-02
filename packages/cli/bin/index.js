#!/usr/bin/env node

const { cli } = require('..');
const packageInfo = require('../package.json');

cli(packageInfo);
