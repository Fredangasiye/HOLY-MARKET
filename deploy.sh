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
    
    echo ""
    echo "🌐 To deploy to Vercel:"
    echo "1. Commit your changes: git add . && git commit -m 'Update UI'"
    echo "2. Push to GitHub: git push"
    echo "3. Vercel will automatically deploy from the dist/ folder"
    echo ""
    echo "🔍 To test locally: npx expo start --web"
else
    echo "❌ Build failed!"
    exit 1
fi 