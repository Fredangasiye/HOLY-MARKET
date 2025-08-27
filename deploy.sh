#!/bin/bash

echo "🚀 Starting HOLY-MARKET deployment..."

# Clear any existing builds
echo "🧹 Cleaning previous builds..."
rm -rf dist
rm -rf .expo

# Clear cache and rebuild
echo "🔨 Building fresh web version..."
npx expo export --platform web

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! Files created in dist/"
    echo "📁 Build contents:"
    ls -la dist/
    
    # Add all changes to git
    echo "📝 Adding changes to git..."
    git add .
    
    # Create a new commit
    echo "💾 Creating new commit..."
    git commit -m "Deploy: Update HOLY-MARKET app state - $(date)"
    
    # Push to GitHub
    echo "🚀 Pushing to GitHub..."
    git push
    
    echo ""
    echo "✅ Deployment initiated!"
    echo "🌐 Vercel will automatically deploy from the latest commit"
    echo "🔍 To test locally: npx expo start --web"
else
    echo "❌ Build failed!"
    exit 1
fi 