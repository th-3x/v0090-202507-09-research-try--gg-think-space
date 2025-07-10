#!/bin/bash

# Phase 2 Test Runner Script
# Validates feature extraction and implementation completion

set -e  # Exit on any error

echo "🧪 Phase 2 Feature Extraction Test Runner"
echo "=========================================="

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

# Check if Phase 1 was completed
echo "🔍 Checking Phase 1 prerequisites..."
if [ ! -d "src/features" ] || [ ! -d "src/shared" ] || [ ! -d "src/infrastructure" ]; then
    echo "❌ Phase 1 infrastructure not found!"
    echo "Please complete Phase 1 setup before running Phase 2 tests"
    echo "Run: ./run-phase1-tests.sh"
    exit 1
fi

echo "✅ Phase 1 infrastructure detected"

# Make the test script executable
chmod +x test-phase2.js

echo ""
echo "📋 Running Phase 2 feature extraction tests..."
echo "This will validate:"
echo "  🎨 Photo Visualization feature"
echo "  🤖 AI Search feature"
echo "  📐 Layout Management feature"
echo "  🖼️  Photo Gallery feature"
echo "  🔗 Feature Integration"
echo "  🧪 Testing & Validation"
echo ""

# Run the test script
if node test-phase2.js; then
    echo ""
    echo "✅ Phase 2 tests completed successfully!"
    echo "🎉 Feature extraction is complete!"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Review phase3-backlog.md for state management refactor"
    echo "2. Start with feature-specific stores"
    echo "3. Implement cross-feature communication"
    echo "4. Run Phase 3 tests when ready"
    echo ""
    echo "📊 Architecture Status:"
    echo "  ✅ Infrastructure Layer (Phase 1)"
    echo "  ✅ Features Layer (Phase 2)"
    echo "  ⏳ State Management (Phase 3)"
    echo "  ⏳ Testing & Documentation (Phase 4)"
    exit 0
else
    echo ""
    echo "❌ Phase 2 tests failed!"
    echo "📋 Please review the failed tests above and:"
    echo ""
    echo "🔧 Common issues to check:"
    echo "1. Feature components not extracted from original files"
    echo "2. Services layer not implemented"
    echo "3. Hooks not created for feature state management"
    echo "4. Feature index.ts files missing or incomplete"
    echo "5. App.jsx not updated to use new feature components"
    echo "6. Import paths not updated to use @/features/"
    echo ""
    echo "📚 Resources:"
    echo "• phase2-backlog.md - Detailed task breakdown"
    echo "• plan.md - Overall architecture plan"
    echo "• TEST-README.md - Testing documentation"
    echo ""
    echo "🔄 Workflow:"
    echo "1. Complete missing Phase 2 tasks"
    echo "2. Re-run: ./run-phase2-tests.sh"
    echo "3. Fix any remaining issues"
    echo "4. Proceed to Phase 3 when all tests pass"
    exit 1
fi
