#!/usr/bin/env node

/**
 * Phase 3 State Management Refactor Test Script
 * 
 * This script validates that all Phase 3 tasks have been completed correctly:
 * - Feature-specific stores implementation
 * - Store composition and provider system
 * - Cross-feature communication
 * - Migration from monolithic store
 * - Performance optimizations
 * - State management boundaries
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = [];

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function test(description, testFn) {
  totalTests++;
  try {
    const result = testFn();
    if (result) {
      passedTests++;
      log(`✅ ${description}`, 'green');
    } else {
      failedTests.push(description);
      log(`❌ ${description}`, 'red');
    }
  } catch (error) {
    failedTests.push(`${description}: ${error.message}`);
    log(`❌ ${description}: ${error.message}`, 'red');
  }
}

function fileExists(filePath) {
  return fs.existsSync(path.join(__dirname, filePath));
}

function directoryExists(dirPath) {
  const fullPath = path.join(__dirname, dirPath);
  return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
}

function checkFileContent(filePath, searchStrings) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    if (Array.isArray(searchStrings)) {
      return searchStrings.every(str => content.includes(str));
    }
    return content.includes(searchStrings);
  } catch (error) {
    return false;
  }
}

function checkStoreInterface(filePath, expectedMethods) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    return expectedMethods.every(method => 
      content.includes(method) || 
      content.includes(`${method}:`) ||
      content.includes(`${method}(`)
    );
  } catch (error) {
    return false;
  }
}

function checkZustandStore(filePath) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    return content.includes('create(') && 
           (content.includes('zustand') || content.includes('immer'));
  } catch (error) {
    return false;
  }
}

// Test Suite
function runTests() {
  log('\n🧪 Phase 3 State Management Refactor Test Suite', 'bold');
  log('=' .repeat(70), 'blue');

  // Epic 1: Feature Store Architecture
  log('\n🏗️ Epic 1: Feature Store Architecture', 'cyan');
  
  test('Store directories created for all features', () => {
    const features = ['photo-visualization', 'ai-search', 'layout-management', 'photo-gallery'];
    return features.every(feature => 
      directoryExists(`src/features/${feature}/store`) ||
      directoryExists(`src/features/${feature}/stores`)
    );
  });

  test('App store directory created', () => 
    directoryExists('src/app/store') || directoryExists('src/app/stores')
  );

  test('Store composition layer exists', () => 
    fileExists('src/app/store/StoreProvider.tsx') ||
    fileExists('src/app/store/StoreProvider.jsx') ||
    fileExists('src/app/stores/StoreProvider.tsx') ||
    fileExists('src/app/stores/StoreProvider.jsx')
  );

  // Epic 2: Photo Visualization Store
  log('\n🎨 Epic 2: Photo Visualization Store', 'cyan');
  
  test('PhotoVisualizationStore implemented', () => {
    const storePaths = [
      'src/features/photo-visualization/store/PhotoVisualizationStore.ts',
      'src/features/photo-visualization/stores/PhotoVisualizationStore.ts',
      'src/features/photo-visualization/store/index.ts'
    ];
    return storePaths.some(path => fileExists(path) && checkZustandStore(path));
  });

  test('PhotoVisualization store has required state', () => {
    const storePaths = [
      'src/features/photo-visualization/store/PhotoVisualizationStore.ts',
      'src/features/photo-visualization/stores/PhotoVisualizationStore.ts',
      'src/features/photo-visualization/store/index.ts'
    ];
    const requiredState = ['nodePositions', 'resetCam', 'xRayMode'];
    return storePaths.some(path => 
      fileExists(path) && checkStoreInterface(path, requiredState)
    );
  });

  test('CameraStore implemented', () => {
    const storePaths = [
      'src/features/photo-visualization/store/CameraStore.ts',
      'src/features/photo-visualization/stores/CameraStore.ts',
      'src/app/store/CameraStore.ts'
    ];
    return storePaths.some(path => fileExists(path) && checkZustandStore(path));
  });

  test('Camera store has required state', () => {
    const storePaths = [
      'src/features/photo-visualization/store/CameraStore.ts',
      'src/features/photo-visualization/stores/CameraStore.ts',
      'src/app/store/CameraStore.ts'
    ];
    const requiredState = ['cameraHistory', 'canGoBack', 'triggerGoBack'];
    return storePaths.some(path => 
      fileExists(path) && checkStoreInterface(path, requiredState)
    );
  });

  test('Visualization store hooks created', () => {
    const hookPaths = [
      'src/features/photo-visualization/store/hooks.ts',
      'src/features/photo-visualization/hooks/useVisualization.ts',
      'src/features/photo-visualization/hooks/useCamera.ts'
    ];
    return hookPaths.some(path => fileExists(path));
  });

  // Epic 3: AI Search Store
  log('\n🤖 Epic 3: AI Search Store', 'cyan');
  
  test('AISearchStore implemented', () => {
    const storePaths = [
      'src/features/ai-search/store/AISearchStore.ts',
      'src/features/ai-search/stores/AISearchStore.ts',
      'src/features/ai-search/store/index.ts'
    ];
    return storePaths.some(path => fileExists(path) && checkZustandStore(path));
  });

  test('AI Search store has required state', () => {
    const storePaths = [
      'src/features/ai-search/store/AISearchStore.ts',
      'src/features/ai-search/stores/AISearchStore.ts',
      'src/features/ai-search/store/index.ts'
    ];
    const requiredState = ['isFetching', 'highlightNodes', 'caption'];
    return storePaths.some(path => 
      fileExists(path) && checkStoreInterface(path, requiredState)
    );
  });

  test('Search store hooks created', () => {
    const hookPaths = [
      'src/features/ai-search/store/hooks.ts',
      'src/features/ai-search/hooks/useSearch.ts',
      'src/features/ai-search/hooks/useSearchHistory.ts'
    ];
    return hookPaths.some(path => fileExists(path));
  });

  // Epic 4: Layout Management Store
  log('\n📐 Epic 4: Layout Management Store', 'cyan');
  
  test('LayoutManagementStore implemented', () => {
    const storePaths = [
      'src/features/layout-management/store/LayoutManagementStore.ts',
      'src/features/layout-management/stores/LayoutManagementStore.ts',
      'src/features/layout-management/store/index.ts'
    ];
    return storePaths.some(path => fileExists(path) && checkZustandStore(path));
  });

  test('Layout store has required state', () => {
    const storePaths = [
      'src/features/layout-management/store/LayoutManagementStore.ts',
      'src/features/layout-management/stores/LayoutManagementStore.ts',
      'src/features/layout-management/store/index.ts'
    ];
    const requiredState = ['layout', 'layouts', 'currentLayout'];
    return storePaths.some(path => 
      fileExists(path) && checkStoreInterface(path, requiredState)
    );
  });

  test('Layout store hooks created', () => {
    const hookPaths = [
      'src/features/layout-management/store/hooks.ts',
      'src/features/layout-management/hooks/useLayout.ts',
      'src/features/layout-management/hooks/useLayoutTransition.ts'
    ];
    return hookPaths.some(path => fileExists(path));
  });

  // Epic 5: Photo Gallery Store
  log('\n🖼️ Epic 5: Photo Gallery Store', 'cyan');
  
  test('PhotoGalleryStore implemented', () => {
    const storePaths = [
      'src/features/photo-gallery/store/PhotoGalleryStore.ts',
      'src/features/photo-gallery/stores/PhotoGalleryStore.ts',
      'src/features/photo-gallery/store/index.ts'
    ];
    return storePaths.some(path => fileExists(path) && checkZustandStore(path));
  });

  test('Gallery store has required state', () => {
    const storePaths = [
      'src/features/photo-gallery/store/PhotoGalleryStore.ts',
      'src/features/photo-gallery/stores/PhotoGalleryStore.ts',
      'src/features/photo-gallery/store/index.ts'
    ];
    const requiredState = ['images', 'targetImage', 'isSidebarOpen'];
    return storePaths.some(path => 
      fileExists(path) && checkStoreInterface(path, requiredState)
    );
  });

  test('Gallery store hooks created', () => {
    const hookPaths = [
      'src/features/photo-gallery/store/hooks.ts',
      'src/features/photo-gallery/hooks/useGallery.ts',
      'src/features/photo-gallery/hooks/usePhotoSelection.ts'
    ];
    return hookPaths.some(path => fileExists(path));
  });

  // Epic 6: Store Composition & Integration
  log('\n🔗 Epic 6: Store Composition & Integration', 'cyan');
  
  test('StoreProvider component exists', () => {
    const providerPaths = [
      'src/app/store/StoreProvider.tsx',
      'src/app/stores/StoreProvider.tsx',
      'src/app/StoreProvider.tsx'
    ];
    return providerPaths.some(path => fileExists(path));
  });

  test('Store composition utilities exist', () => {
    const compositionPaths = [
      'src/app/store/storeComposition.ts',
      'src/app/store/useStores.ts',
      'src/app/stores/composition.ts'
    ];
    return compositionPaths.some(path => fileExists(path));
  });

  test('Cross-feature communication system exists', () => {
    const communicationPaths = [
      'src/app/store/eventBus.ts',
      'src/shared/store/eventBus.ts',
      'src/app/store/communication.ts'
    ];
    return communicationPaths.some(path => fileExists(path));
  });

  test('App store for global state exists', () => {
    const appStorePaths = [
      'src/app/store/AppStore.ts',
      'src/app/stores/AppStore.ts',
      'src/app/store/index.ts'
    ];
    return appStorePaths.some(path => fileExists(path) && checkZustandStore(path));
  });

  // Epic 7: Migration & Compatibility
  log('\n🔄 Epic 7: Migration & Compatibility', 'cyan');
  
  test('App component updated to use StoreProvider', () => {
    const appPaths = ['src/app/App.tsx', 'src/app/App.jsx', 'App.jsx', 'App.tsx'];
    return appPaths.some(path => 
      fileExists(path) && checkFileContent(path, 'StoreProvider')
    );
  });

  test('Original store.js deprecated or removed', () => {
    if (!fileExists('store.js')) return true; // Removed
    // If exists, check if it's deprecated
    return checkFileContent('store.js', ['@deprecated', 'DEPRECATED', 'deprecated']);
  });

  test('Components updated to use feature stores', () => {
    // Check if any components import from feature stores
    const componentPaths = [
      'src/features/photo-visualization/components',
      'src/features/ai-search/components',
      'src/features/layout-management/components',
      'src/features/photo-gallery/components'
    ];
    
    return componentPaths.some(dir => {
      if (!directoryExists(dir)) return false;
      try {
        const files = fs.readdirSync(path.join(__dirname, dir));
        return files.some(file => {
          if (!file.endsWith('.tsx') && !file.endsWith('.jsx')) return false;
          const filePath = path.join(dir, file);
          return checkFileContent(filePath, ['useStore', 'store', 'Store']);
        });
      } catch {
        return false;
      }
    });
  });

  // Epic 8: Performance & Optimization
  log('\n⚡ Epic 8: Performance & Optimization', 'cyan');
  
  test('Store memoization implemented', () => {
    const storePaths = [
      'src/features/*/store/*.ts',
      'src/app/store/*.ts'
    ];
    // Check for common memoization patterns
    const memoPatterns = ['useMemo', 'useCallback', 'memo', 'shallow'];
    
    const features = ['photo-visualization', 'ai-search', 'layout-management', 'photo-gallery'];
    return features.some(feature => {
      const storePath = `src/features/${feature}/store`;
      if (!directoryExists(storePath)) return false;
      try {
        const files = fs.readdirSync(path.join(__dirname, storePath));
        return files.some(file => {
          if (!file.endsWith('.ts') && !file.endsWith('.tsx')) return false;
          const filePath = path.join(storePath, file);
          return memoPatterns.some(pattern => checkFileContent(filePath, pattern));
        });
      } catch {
        return false;
      }
    });
  });

  test('Selective subscriptions implemented', () => {
    // Check for selective subscription patterns
    const subscriptionPatterns = ['useShallow', 'shallow', 'subscribeWithSelector'];
    
    const hookPaths = [
      'src/features/photo-visualization/hooks',
      'src/features/ai-search/hooks',
      'src/features/layout-management/hooks',
      'src/features/photo-gallery/hooks'
    ];
    
    return hookPaths.some(dir => {
      if (!directoryExists(dir)) return false;
      try {
        const files = fs.readdirSync(path.join(__dirname, dir));
        return files.some(file => {
          if (!file.endsWith('.ts') && !file.endsWith('.tsx')) return false;
          const filePath = path.join(dir, file);
          return subscriptionPatterns.some(pattern => checkFileContent(filePath, pattern));
        });
      } catch {
        return false;
      }
    });
  });

  // Build and Runtime Tests
  log('\n🚀 Build and Runtime Tests', 'cyan');
  
  test('TypeScript compilation passes', () => {
    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  });

  test('Vite build succeeds', () => {
    try {
      execSync('npm run build', { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  });

  test('Development server starts without errors', () => {
    try {
      const child = execSync('timeout 20s npm run dev 2>&1 || true', { stdio: 'pipe' });
      const output = child.toString();
      return !output.includes('Error:') && 
             !output.includes('Failed to') &&
             !output.includes('Cannot resolve') &&
             !output.includes('store is not defined') &&
             (output.includes('Local:') || output.includes('ready') || output.includes('dev server'));
    } catch (error) {
      return false;
    }
  });

  // State Management Boundary Tests
  log('\n🏛️ State Management Boundary Tests', 'cyan');
  
  test('No direct store imports between features', () => {
    const features = ['photo-visualization', 'ai-search', 'layout-management', 'photo-gallery'];
    
    return features.every(feature => {
      const featurePath = `src/features/${feature}`;
      if (!directoryExists(featurePath)) return true;
      
      try {
        const checkDirectory = (dir) => {
          const files = fs.readdirSync(path.join(__dirname, dir), { recursive: true });
          return files.every(file => {
            if (!file.endsWith('.ts') && !file.endsWith('.tsx') && 
                !file.endsWith('.js') && !file.endsWith('.jsx')) return true;
            
            const filePath = path.join(__dirname, dir, file);
            if (!fs.statSync(filePath).isFile()) return true;
            
            const content = fs.readFileSync(filePath, 'utf8');
            const otherFeatures = features.filter(f => f !== feature);
            
            // Check for direct store imports from other features
            return !otherFeatures.some(otherFeature => 
              content.includes(`@/features/${otherFeature}/store/`) ||
              content.includes(`../../../features/${otherFeature}/store/`)
            );
          });
        };
        
        return checkDirectory(featurePath);
      } catch {
        return true;
      }
    });
  });

  test('Store providers properly nested', () => {
    const appPaths = ['src/app/App.tsx', 'src/app/App.jsx', 'App.jsx', 'App.tsx'];
    return appPaths.some(path => {
      if (!fileExists(path)) return false;
      const content = fs.readFileSync(path.join(__dirname, path), 'utf8');
      // Check for provider wrapping pattern
      return content.includes('Provider') && 
             (content.includes('<StoreProvider') || content.includes('<Provider'));
    });
  });
}

function printSummary() {
  log('\n' + '=' .repeat(70), 'blue');
  log('📊 Phase 3 Test Summary', 'bold');
  log('=' .repeat(70), 'blue');
  
  log(`Total Tests: ${totalTests}`, 'blue');
  log(`Passed: ${passedTests}`, 'green');
  log(`Failed: ${totalTests - passedTests}`, 'red');
  log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, 'yellow');

  if (failedTests.length > 0) {
    log('\n❌ Failed Tests:', 'red');
    failedTests.forEach(test => log(`  • ${test}`, 'red'));
  }

  if (passedTests === totalTests) {
    log('\n🎉 All tests passed! Phase 3 state management refactor is complete.', 'green');
    log('✅ Ready to proceed to Phase 4: Testing & Documentation', 'green');
    log('🏗️ Clean architecture with feature stores successfully implemented!', 'cyan');
  } else {
    log('\n⚠️  Some tests failed. Please review the Phase 3 backlog and complete missing tasks.', 'yellow');
    log('📋 Refer to phase3-backlog.md for detailed requirements.', 'yellow');
    
    const failureRate = ((totalTests - passedTests) / totalTests) * 100;
    if (failureRate <= 20) {
      log('\n💡 Almost there! Just a few more tasks to complete.', 'cyan');
    } else if (failureRate <= 50) {
      log('\n🔧 Good progress! Continue with the remaining store implementations.', 'magenta');
    } else {
      log('\n📚 Significant work remaining. Focus on implementing feature stores first.', 'yellow');
    }
  }
}

// Run the test suite
try {
  runTests();
  printSummary();
  
  // Exit with appropriate code
  process.exit(passedTests === totalTests ? 0 : 1);
} catch (error) {
  log(`\n💥 Test suite failed to run: ${error.message}`, 'red');
  process.exit(1);
}
