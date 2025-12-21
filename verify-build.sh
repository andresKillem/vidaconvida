#!/bin/bash
# Build verification script for AIDP pipeline
# Ensures the Next.js application builds successfully

set -e

echo "🔍 Verifying Vida con Vida build..."

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run the build
echo "🏗️  Building application..."
npm run build

# Verify test page exists
if [ -f "src/app/test/page.tsx" ]; then
    echo "✅ Test page exists at /test"
else
    echo "❌ Test page not found"
    exit 1
fi

echo "✅ Build verification complete"
echo "🌐 Test page available at: http://localhost:3000/test"
