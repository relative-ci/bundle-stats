#!/bin/bash

# Cleanup folder
rm -fr __fixtures__ && mkdir __fixtures__

# Copy files from project's root directory
cp ../../fixtures/webpack-stats.*.json __fixtures__/
