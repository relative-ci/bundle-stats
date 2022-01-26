#!/usr/bin/env node

const { execSync } = require('child_process');

const tag = execSync('git tag -l --points-at HEAD').toString().trim();
const matchTag = tag.match(/^v\d*\.\d*\.\d*-(\w*)\..*$/);
const distTag = (matchTag && matchTag[1]) || 'latest';

const options = [
  'publish',
  'from-git',
  `--dist-tag ${distTag}`,
  '--no-git-reset',
  '--no-changelog',
  '--no-git-tag-version',
  '--no-push',
  '--yes',
  '--loglevel debug'
];

console.log(`Running lerna with "${options.join(' ')}"`);

execSync(`npm run lerna -- ${options.join(' ')}`);
