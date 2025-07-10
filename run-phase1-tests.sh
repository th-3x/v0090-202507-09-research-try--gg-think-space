#!/bin/bash

# Phase 1 Test Runner Script
# Makes the test script executable and runs it with proper error handling

set -e  # Exit on any error

echo "🧪 Phase 1 Infrastructure Setup Test Runner"
echo "============================================"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH"
    echo "Please install Node.js to run the tests"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed or not in PATH"
    echo "Please install npm to run the tests"
    exit 1
fi

# Make the test script executable
chmod +x test-phase1.js

echo "📋 Running Phase 1 infrastructure tests..."
echo ""

# Run the test script
if node test-phase1.js; then
    echo ""
    echo "✅ Phase 1 tests completed successfully!"
    echo "🚀 You can now proceed to Phase 2: Feature Extraction"
    echo ""
    echo "Next steps:"
    echo "1. Review phase2-backlog.md for detailed tasks"
    echo "2. Start with Epic 1: Photo Visualization Feature"
    echo "3. Run tests after each major change"
    exit 0
else
    echo ""
    echo "❌ Phase 1 tests failed!"
    echo "📋 Please review the failed tests above and:"
    echo "1. Check phase1-backlog.md for requirements"
    echo "2. Complete any missing infrastructure setup"
    echo "3. Re-run this test script"
    echo ""
    echo "Common issues:"
    echo "• Missing directory structure (run: mkdir -p src/{app,features,shared,infrastructure})"
    echo "• TypeScript configuration not updated"
    echo "• Vite configuration missing path aliases"
    echo "• Missing index.ts files in feature directories"
    exit 1
fi
