#!/usr/bin/env node

const { execSync } = require('child_process');

const tag = execSync('git tag -l --points-at HEAD').toString().trim();
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

execSync(`npm run lerna -- ${options.join(' ')}`, {
  stdio: 'inherit',
  env: {
    ...process.env,
    // sigstore (npm provenance) defaults to a 5s request timeout and retries with the same
    // signed payload; when Rekor is slow, the first request is logged server-side and the
    // retry fails with `TLOG_CREATE_ENTRY_ERROR (409) an equivalent entry already exists`.
    // lerna forwards npm_config_* to libnpmpublish -> sigstore (also used as the registry fetch timeout).
    npm_config_timeout: process.env.npm_config_timeout || '120000',
  },
});
