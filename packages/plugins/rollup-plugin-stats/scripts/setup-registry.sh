#!/bin/bash

npm install -g verdaccio
npx verdaccio --config ./verdaccio.yml &

sleep 10

npm config set registry=http://localhost:4873
npm config set //localhost:4873/:_authToken=fooBar # Add a non empty token for npm 6

## Always release as beta for testing
npm publish --tag beta
