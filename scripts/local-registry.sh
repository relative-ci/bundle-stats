#!/bin/bash

echo "Run local registry"
npx verdaccio --config ./verdaccio.yaml

echo "Wait for the start"
sleep 10
