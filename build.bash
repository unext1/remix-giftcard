#! /bin/bash
set -e

VERSION_RELEASE=$(date "+%Y%m%d-%H%M")

BASE_IMAGE_NAME="lauva/couponapp"
DOCKER_IMAGE_NAME="${BASE_IMAGE_NAME}:${VERSION_RELEASE}"
COMPOSE_PROD_PATH="./docker-compose.yml"

echo "Building version: ${DOCKER_IMAGE_NAME}"

# BUILD AND PUSH IMAGE
docker build --tag ${DOCKER_IMAGE_NAME} .
docker push ${DOCKER_IMAGE_NAME}

# UPDATE docker-compose file
sed -E -i.bak "s|(\.*)(image: ${BASE_IMAGE_NAME}:)([0-9]+.+)|\1image: ${DOCKER_IMAGE_NAME}|" ${COMPOSE_PROD_PATH}

echo "Build version: $DOCKER_IMAGE_NAME"