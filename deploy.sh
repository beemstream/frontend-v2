#!/bin/bash

npm version minor

# Push bumped as docker tag
PACKAGE_VERSION=`node -p "require('./package.json').version"`
docker build -t beemstream/nbp-frontend:$PACKAGE_VERSION .
docker push beemstream/nbp-frontend:$PACKAGE_VERSION

# Tag image as latest
docker build -f beemstream/nbp-frontend .
docker push beemstream/nbp-frontend

ssh root@157.245.43.172 "docker service update --image beemstream/nbp-frontend beemstream_nbp_frontend"
