#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | grep -v '^$' | xargs)
fi

# Build Android release
ns build android --release \
  --key-store-path "$ANDROID_KEYSTORE_PATH" \
  --key-store-password "$ANDROID_KEYSTORE_PASSWORD" \
  --key-store-alias "$ANDROID_KEY_ALIAS" \
  --key-store-alias-password "$ANDROID_KEY_PASSWORD"