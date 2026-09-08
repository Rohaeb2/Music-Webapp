#!/bin/bash

# Build and deploy to Amazon ECR
echo "Initializing instance"
AWS_REGION="us-east-1"

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URI="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazon.com/${IMAGE_NAME}"

IMAGE_NAME="$1"
BUILD_CONTEXT="$2"
IMAGE_TAG=$(date +%s)

docker build --tag "${IMAGE_NAME}:${IMAGE_TAG}" "${BUILD_CONTEXT}"
docker tag "${IMAGE_NAME}:${IMAGE_TAG}" "${ECR_URI}:${IMAGE_TAG}"
docker push ${ECR_URI}:${IMAGE_TAG}"