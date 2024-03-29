#!/bin/bash

npm version minor

# Push bumped as docker tag
PACKAGE_VERSION=`node -p "require('./package.json').version"`
docker build -t beemstream/nbp-frontend:$PACKAGE_VERSION .
docker push beemstream/nbp-frontend:$PACKAGE_VERSION

# Tag image as latest
docker pull beemstream/nbp-frontend:$PACKAGE_VERSION
docker tag beemstream/nbp-frontend:$PACKAGE_VERSION beemstream/nbp-frontend:latest
docker push beemstream/nbp-frontend:latest

ssh root@157.245.43.172 "docker service update --image beemstream/nbp-frontend beemstream_nbp_frontend && docker container prune -f && docker image prune -a -f"
