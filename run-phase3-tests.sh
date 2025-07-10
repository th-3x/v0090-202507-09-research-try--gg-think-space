#!/bin/bash

# Phase 3 Test Runner Script
# Validates state management refactor completion

set -e  # Exit on any error

echo "🧪 Phase 3 State Management Refactor Test Runner"
echo "================================================"

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

# Check if Phase 1 and 2 were completed
echo "🔍 Checking prerequisites..."

if [ ! -d "src/features" ] || [ ! -d "src/shared" ] || [ ! -d "src/infrastructure" ]; then
    echo "❌ Phase 1 infrastructure not found!"
    echo "Please complete Phase 1 setup before running Phase 3 tests"
    echo "Run: ./run-phase1-tests.sh"
    exit 1
fi

# Check for feature components (Phase 2 indicator)
feature_components_found=false
for feature in photo-visualization ai-search layout-management photo-gallery; do
    if [ -d "src/features/$feature/components" ]; then
        feature_components_found=true
        break
    fi
done

if [ "$feature_components_found" = false ]; then
    echo "❌ Phase 2 feature extraction not completed!"
    echo "Please complete Phase 2 feature extraction before running Phase 3 tests"
    echo "Run: ./run-phase2-tests.sh"
    exit 1
fi

echo "✅ Phase 1 infrastructure detected"
echo "✅ Phase 2 feature extraction detected"

# Make the test script executable
chmod +x test-phase3.js

echo ""
echo "📋 Running Phase 3 state management refactor tests..."
echo "This will validate:"
echo "  🏗️  Feature Store Architecture"
echo "  🎨 Photo Visualization Store"
echo "  🤖 AI Search Store"
echo "  📐 Layout Management Store"
echo "  🖼️  Photo Gallery Store"
echo "  🔗 Store Composition & Integration"
echo "  🔄 Migration & Compatibility"
echo "  ⚡ Performance & Optimization"
echo ""

# Run the test script
if node test-phase3.js; then
    echo ""
    echo "✅ Phase 3 tests completed successfully!"
    echo "🎉 State management refactor is complete!"
    echo ""
    echo "🏆 Architecture Achievements:"
    echo "  ✅ Monolithic store successfully split into feature stores"
    echo "  ✅ Clean boundaries between features established"
    echo "  ✅ Cross-feature communication implemented"
    echo "  ✅ Performance optimizations in place"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Review phase4-backlog.md for testing & documentation"
    echo "2. Create comprehensive unit tests for all stores"
    echo "3. Add integration tests for cross-feature communication"
    echo "4. Complete final documentation and optimization"
    echo ""
    echo "📊 Architecture Status:"
    echo "  ✅ Infrastructure Layer (Phase 1)"
    echo "  ✅ Features Layer (Phase 2)"
    echo "  ✅ State Management (Phase 3)"
    echo "  ⏳ Testing & Documentation (Phase 4)"
    exit 0
else
    echo ""
    echo "❌ Phase 3 tests failed!"
    echo "📋 Please review the failed tests above and:"
    echo ""
    echo "🔧 Common issues to check:"
    echo "1. Feature stores not implemented in store/ directories"
    echo "2. Store interfaces missing required state properties"
    echo "3. Zustand stores not properly configured"
    echo "4. StoreProvider not created or not wrapping App"
    echo "5. Store hooks not created for feature state access"
    echo "6. Cross-feature communication system missing"
    echo "7. Original store.js not deprecated/migrated"
    echo "8. Components not updated to use new stores"
    echo ""
    echo "📚 Store Implementation Guide:"
    echo "• Each feature should have: src/features/{feature}/store/"
    echo "• Required stores: PhotoVisualizationStore, AISearchStore, LayoutManagementStore, PhotoGalleryStore"
    echo "• App store: src/app/store/AppStore.ts"
    echo "• Store provider: src/app/store/StoreProvider.tsx"
    echo "• Store hooks: src/features/{feature}/hooks/ or store/hooks.ts"
    echo ""
    echo "🎯 State Distribution:"
    echo "• PhotoVisualization: nodePositions, resetCam, xRayMode"
    echo "• AISearch: isFetching, highlightNodes, caption"
    echo "• LayoutManagement: layout, layouts"
    echo "• PhotoGallery: images, targetImage, isSidebarOpen"
    echo "• Camera: cameraHistory, canGoBack, triggerGoBack"
    echo "• App: didInit, global state"
    echo ""
    echo "📚 Resources:"
    echo "• phase3-backlog.md - Detailed task breakdown"
    echo "• plan.md - Overall architecture plan"
    echo "• TEST-README.md - Testing documentation"
    echo ""
    echo "🔄 Workflow:"
    echo "1. Implement missing feature stores"
    echo "2. Create store composition layer"
    echo "3. Update components to use new stores"
    echo "4. Re-run: ./run-phase3-tests.sh"
    echo "5. Fix any remaining issues"
    echo "6. Proceed to Phase 4 when all tests pass"
    exit 1
fi
