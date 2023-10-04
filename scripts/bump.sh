#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
PRERELEASE_ARG=""

# IF diff than master, release beta
if [ "$BRANCH" != "master" ]
then
  if [ $1 ]
  then
    VERSION="$1"
  else
    VERSION="prerelease"
  fi
  PRERELEASE_ARG="$VERSION --force-publish"
  MESSAGE=$"DROP: %s"
else
	PRERELEASE_ARG=""
  MESSAGE=$":package: release %s"
fi

RELEASE_ARGS="--exact ${PRERELEASE_ARG}"

echo "Running lerna version with '${RELEASE_ARGS}'."

./node_modules/.bin/lerna version $RELEASE_ARGS --message "$MESSAGE"
