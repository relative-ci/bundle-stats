#!/bin/bash

TAG=$(git describe --tags --abbrev=0)
VERSION=${TAG:1}

npx release-it $VERSION --config ./config/release-it/release.js --ci --verbose
