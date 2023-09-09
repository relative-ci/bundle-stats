#!/bin/bash

echo "Setup npmrc"
npm config set registry=http://localhost:4873
npm config set //localhost:4873/:_authToken=fooBar # Add a non empty token for npm 6

echo "Run local registry"
npx verdaccio --config ./verdaccio.yaml

echo "Wait for the start"
sleep 10
