#!/bin/bash

# Build and deploy to Amazon ECR
echo "Initializing instance"
set -e
IMAGE_NAME="$1"
BUILD_CONTEXT="$2"
IMAGE_TAG=$(date +%s)

echo "Building Docker Image"

docker build --tag "$REGISTRY/$REPOSITORY:${IMAGE_TAG}" "${BUILD_CONTEXT}"

echo "Completed building Docker Image"

echo "pushing to ECR"

docker push "$REGISTRY/$REPOSITORY:${IMAGE_TAG}"
