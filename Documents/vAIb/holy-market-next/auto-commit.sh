#!/bin/bash

# Auto-commit script for holy-market-next
# Run this script after making changes

TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
COMMIT_MSG="Auto-save: Update at $TIMESTAMP"

# Create backup
echo "Creating backup..."
cp -r src src.backup.$(date +%Y%m%d_%H%M%S)

# Add all changes
git add .

# Commit with timestamp
git commit -m "$COMMIT_MSG"

# Push to remote (optional)
# git push origin main

echo "✅ Auto-commit completed: $COMMIT_MSG"