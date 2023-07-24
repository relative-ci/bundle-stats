#!/bin/bash

echo "Setup npmrc"
npm config set registry=http://localhost:4873
npm config set //localhost:4873/:_authToken=fooBar # Add a non empty token for npm 6

npx lerna exec 'npm publish'
