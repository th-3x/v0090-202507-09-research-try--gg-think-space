# Test Scripts Documentation

## Overview
This directory contains test scripts to validate the completion of clean architecture migration phases.

## Files

### Phase 1 Tests (Infrastructure Setup)

#### `test-phase1.js`
The main test script that validates all Phase 1 requirements:
- **Directory structure** - Checks all required folders are created
- **Build configuration** - Validates TypeScript and Vite configs
- **Shared utilities** - Ensures shared layer is set up
- **Infrastructure layer** - Checks API and storage abstractions
- **Migration preparation** - Validates feature index files
- **Build and runtime** - Tests compilation and dev server

#### `run-phase1-tests.sh`
A shell script wrapper that:
- Checks Node.js and npm availability
- Makes the test script executable
- Runs tests with proper error handling
- Provides clear next steps based on results

### Phase 2 Tests (Feature Extraction)

#### `test-phase2.js`
Comprehensive test script for Phase 2 feature extraction:
- **Photo Visualization feature** - Components, services, hooks
- **AI Search feature** - Search logic, components, AI integration
- **Layout Management feature** - Layout controls and services
- **Photo Gallery feature** - Gallery components and services
- **Feature Integration** - App updates and cross-feature communication
- **Testing & Validation** - Build tests and boundary validation

#### `run-phase2-tests.sh`
Phase 2 test runner that:
- Validates Phase 1 prerequisites
- Runs comprehensive feature extraction tests
- Provides detailed failure analysis
- Guides next steps for Phase 3

### Phase 3 Tests (State Management Refactor)

#### `test-phase3.js`
Comprehensive test script for Phase 3 state management refactor:
- **Feature Store Architecture** - Store directories and composition
- **Photo Visualization Store** - nodePositions, resetCam, xRayMode state
- **AI Search Store** - isFetching, highlightNodes, caption state
- **Layout Management Store** - layout, layouts state
- **Photo Gallery Store** - images, targetImage, isSidebarOpen state
- **Store Composition** - StoreProvider, cross-feature communication
- **Migration & Compatibility** - App updates, store deprecation
- **Performance & Optimization** - Memoization, selective subscriptions

#### `run-phase3-tests.sh`
Phase 3 test runner that:
- Validates Phase 1 and 2 prerequisites
- Runs comprehensive state management tests
- Provides detailed store implementation guidance
- Guides next steps for Phase 4

### `TEST-README.md`
This documentation file explaining how to use all test scripts.

## Usage

### Phase 1 Tests (Infrastructure Setup)
```bash
# Make the runner script executable
chmod +x run-phase1-tests.sh

# Run all Phase 1 tests
./run-phase1-tests.sh

# Or run directly
node test-phase1.js
```

### Phase 2 Tests (Feature Extraction)
```bash
# Make the runner script executable
chmod +x run-phase2-tests.sh

# Run all Phase 2 tests (requires Phase 1 completion)
./run-phase2-tests.sh

# Or run directly
node test-phase2.js
```

### Phase 3 Tests (State Management Refactor)
```bash
# Make the runner script executable
chmod +x run-phase3-tests.sh

# Run all Phase 3 tests (requires Phase 1 & 2 completion)
./run-phase3-tests.sh

# Or run directly
node test-phase3.js
```

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Completed previous phases (Phase 1 & 2 for Phase 3 tests)
- All phase-specific tasks completed (see phase*-backlog.md files)

## Test Categories

### Phase 1: Infrastructure Setup Tests

#### 1. Directory Structure Tests
Validates the new folder hierarchy:
```
src/
├── app/
├── features/
│   ├── photo-visualization/
│   ├── ai-search/
│   ├── layout-management/
│   └── photo-gallery/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
└── infrastructure/
    ├── api/
    ├── storage/
    └── external/
```

#### 2. Configuration Tests
Checks that build tools are properly configured:
- TypeScript path aliases (`@/app/*`, `@/features/*`, etc.)
- Vite resolve aliases
- Correct baseUrl setting

#### 3. Infrastructure Tests
Validates infrastructure layer setup:
- API abstraction files
- Storage abstraction files
- External service interfaces

#### 4. Build Tests
Ensures the application still builds and runs:
- TypeScript compilation
- Vite build process
- Development server startup

#### 5. Legacy Compatibility
Confirms rollback capability:
- Original files still exist
- Package.json unchanged
- No breaking changes to existing functionality

### Phase 2: Feature Extraction Tests

#### 1. Photo Visualization Feature Tests
- PhotoVisualization component extracted from PhotoViz.jsx
- PhotoNode component moved to feature
- CameraControls component created
- Visualization services (VisualizationService, CameraService, EffectsService)
- Visualization hooks (useVisualization, useCamera, useSceneEffects)
- Proper TypeScript types and feature exports

#### 2. AI Search Feature Tests
- SearchInput component extracted from App.jsx
- SearchResults and SearchPresets components
- Search services (SearchService, AIService, QueryProcessor)
- Prompts moved from root to feature
- Search hooks (useSearch, useSearchHistory, useSearchPresets)
- Feature boundary compliance

#### 3. Layout Management Feature Tests
- LayoutControls component extracted
- Layout services (LayoutService, PositionService, AnimationService)
- Layout hooks (useLayout, useLayoutTransition)
- Layout switching logic moved from actions.js

#### 4. Photo Gallery Feature Tests
- PhotoGallery component extracted from Sidebar.jsx
- PhotoList, PhotoThumbnail, PhotoDetails components
- Gallery services (GalleryService, PhotoService, FilterService)
- Gallery hooks (useGallery, usePhotoSelection, usePhotoFilters)

#### 5. Feature Integration Tests
- App.jsx updated to use feature components
- Original components removed or properly migrated
- Actions.js refactored for cross-feature coordination
- LLM integration moved to infrastructure layer

#### 6. Feature Boundary Tests
- Features have proper public APIs through index.ts
- No direct cross-feature imports (loose coupling)
- Shared utilities properly used
- Clean separation of concerns

## Test Output

### Success Example
```
🧪 Phase 1 Infrastructure Setup Test Suite
==================================================

📁 Epic 1: Directory Structure Setup
✅ src/ directory exists
✅ src/app/ directory exists
✅ src/features/ directory exists
...

📊 Test Summary
==================================================
Total Tests: 45
Passed: 45
Failed: 0
Success Rate: 100.0%

🎉 All tests passed! Phase 1 infrastructure setup is complete.
✅ Ready to proceed to Phase 2: Feature Extraction
```

### Failure Example
```
❌ src/shared/types/index.ts exists
❌ TypeScript compilation passes

📊 Test Summary
==================================================
Total Tests: 45
Passed: 43
Failed: 2
Success Rate: 95.6%

❌ Failed Tests:
  • src/shared/types/index.ts exists
  • TypeScript compilation passes

⚠️  Some tests failed. Please review the Phase 1 backlog and complete missing tasks.
📋 Refer to phase1-backlog.md for detailed requirements.
```

## Troubleshooting

### Common Issues

#### Missing Directories
```bash
# Create missing directories
mkdir -p src/{app,features,shared,infrastructure}
mkdir -p src/shared/{components,hooks,utils,types}
mkdir -p src/infrastructure/{api,storage,external}
```

#### TypeScript Configuration
Ensure `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@/app/*": ["./app/*"],
      "@/features/*": ["./features/*"],
      "@/shared/*": ["./shared/*"],
      "@/infrastructure/*": ["./infrastructure/*"]
    }
  }
}
```

#### Vite Configuration
Ensure `vite.config.ts` includes:
```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/infrastructure': path.resolve(__dirname, './src/infrastructure')
    }
  }
})
```

#### Missing Index Files
```bash
# Create feature index files
touch src/features/photo-visualization/index.ts
touch src/features/ai-search/index.ts
touch src/features/layout-management/index.ts
touch src/features/photo-gallery/index.ts
```

#### Build Failures
1. Check for TypeScript errors: `npx tsc --noEmit`
2. Check for missing dependencies: `npm install`
3. Clear build cache: `rm -rf node_modules/.vite`

## Integration with Development Workflow

### Before Starting Phase 2
Always run Phase 1 tests to ensure infrastructure is ready:
```bash
./run-phase1-tests.sh
```

### During Development
Run tests after major infrastructure changes:
```bash
node test-phase1.js
```

### Continuous Integration
Add to CI pipeline:
```yaml
- name: Run Phase 1 Tests
  run: |
    chmod +x run-phase1-tests.sh
    ./run-phase1-tests.sh
```

## Next Steps

After all Phase 1 tests pass:
1. Review `phase2-backlog.md` for feature extraction tasks
2. Start with Photo Visualization feature
3. Create similar test scripts for Phase 2 validation
4. Maintain test-driven approach throughout migration

## Support

If tests continue to fail:
1. Review the detailed Phase 1 backlog (`phase1-backlog.md`)
2. Check the main migration plan (`plan.md`)
3. Ensure all prerequisites are met
4. Consider running tests in verbose mode for more details
