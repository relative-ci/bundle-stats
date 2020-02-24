#!/usr/bin/env node

const { execSync } = require('child_process');

const tag = execSync('git tag -l --points-at HEAD')
  .toString()
  .trim();

const matchTag = tag.match(/^v\d*\.\d*\.\d*-(\w*)\..*$/);
const distTag = (matchTag && matchTag[1]) || 'latest';

const options = [
  'publish',
  'from-git',
  `--dist-tag ${distTag}`,
  '--no-changelog',
  '--no-git-tag-version',
  '--no-push',
  '--yes'
];

console.log(`Running lerna with "${options.join(' ')}"`);

execSync(`./node_modules/.bin/lerna ${options.join(' ')}`);
