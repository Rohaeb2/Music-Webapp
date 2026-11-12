#!/bin/bash

# Build and deploy to Amazon ECR
echo "Initializing instance"
set -e

echo "Building Docker Image"

docker build --tag "$REGISTRY/$REPOSITORY:$IMAGE_TAG" .

echo "Completed building Docker Image"

echo "pushing to ECR"

docker push "$REGISTRY/$REPOSITORY:$IMAGE_TAG"
