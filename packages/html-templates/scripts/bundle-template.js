#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../');
const OUT_DIR = path.join(ROOT_DIR, 'dist');

const template = fs.readFileSync(path.join(ROOT_DIR, 'dist-template', 'index.html'), 'utf8');
const output = `module.exports = decodeURI("${encodeURI(template)}");`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'index.js'), output);
